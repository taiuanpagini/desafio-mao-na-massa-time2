from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import openai
import re
from datetime import datetime, timedelta
import os
import json
from PIL import Image
from azure.storage.blob import BlobClient

from pydantic import BaseModel

load_dotenv()


class MessageRequest(BaseModel):
    message: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TRELLO_KEY = os.getenv("TRELLO_KEY")
TRELLO_TOKEN = os.getenv("TRELLO_TOKEN")
TRELLO_BOARD_ID = os.getenv("TRELLO_BOARD_ID")
TRELLO_LIST_ID = os.getenv("TRELLO_LIST_ID")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

conversation_states = {}


def ask_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100
        )
        return response.choices[0].message['content']
    except openai.error.RateLimitError:
        return "Atingido o limite de requisições."


def comment_on_image(image_url):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "O que é essa imagem?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url,
                            "detail": "low"
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )

    return response.choices[0].message['content']


def extract_card_info(message_str):
    message = json.loads(message_str)

    description = message.get("description", "")

    match = re.search(r'(?:descricao|descrição)\s*(.*)', description, re.IGNORECASE)

    if match:
        message["description"] = match.group(1).strip()

    return json.dumps(message, indent=2, ensure_ascii=False)


async def create_trello_card(card_info_str):
    try:
        card_info = json.loads(card_info_str)
        print("card_info", card_info)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Erro na decodificação JSON. Verifique a entrada.")

    due_date = (datetime.now() + timedelta(weeks=1)).isoformat()

    url = "https://api.trello.com/1/cards"
    query = {
        'key': TRELLO_KEY,
        'token': TRELLO_TOKEN,
        'idList': TRELLO_LIST_ID,
        'name': card_info['title'],
        'desc': card_info['description'],
        'due': due_date
    }

    trello_response = requests.post(url, params=query)

    if trello_response.status_code == 200:
        response = trello_response.json()

        card_url = response.get('shortUrl')

        return {"message": "Card criado com sucesso no Trello!", "card_info": card_info,
                "card_url": card_url}
    else:
        raise HTTPException(status_code=trello_response.status_code, detail="Erro ao criar card no Trello")


@app.post("/chat_mensagem/")
async def chat_mensagem(request: Request, message_request: MessageRequest):
    user_id = request.client.host
    message = message_request.message

    if "titulo" in message or "título" in message or "descrição" in message or "descricao" in message:
        response = ask_gpt(
            "transforme em json formatado com title e description na raiz do objeto ignorando palavra card " + message)
        card_info = extract_card_info(response)

        if card_info:
            result = await create_trello_card(response)
            return {**result, "author": True, "response": response}

        return {
            "message": "Não foi possível entender sua mensagem. Tente por exemplo: Criar um card com titulo Minha task e descrição Minha primeira task",
            "author": True, "response": response}
    else:
        response = ask_gpt(message)
        return {"message": response, "author": True}


@app.post("/chat_audio/")
async def chat_audio(file: UploadFile = File(...)):
    if not any(file.content_type.endswith(ext) for ext in ['audio/wav', 'audio/mpeg', 'audio/flac', 'audio/ogg']):
        raise HTTPException(status_code=400, detail="Formato de áudio não suportado.")

    try:
        audio_bytes = await file.read()

        temp_file_path = "temp_audio.ogg"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(audio_bytes)

        with open(temp_file_path, "rb") as audio_file:
            transcript = openai.Audio.transcribe(
                model="whisper-1",
                file=audio_file
            )

        response = ask_gpt(transcript['text'])

        os.remove(temp_file_path)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if "titulo" in transcript['text'] or "título" in transcript['text'] or "descrição" in transcript[
        'text'] or "descricao" in transcript['text']:
        response = ask_gpt(
            "Extraia o título e descrição da frase e transforme em json formatado com title e description na raiz do objeto ignorando palavra card: " +
            transcript['text'])
        card_info = extract_card_info(response)

        if card_info:
            result = await create_trello_card(response)
            return {**result, "author": True, "response": response}

        return {
            "message": "Não foi possível entender sua mensagem. Tente por exemplo: Criar um card com titulo Minha task e descrição Minha primeira task",
            "author": True, "response": response}
    else:
        response = ask_gpt(transcript['text'])
        return {"message": response, "author": True}


@app.post("/chat_image/")
async def chat_image(file: UploadFile = File(...)):
    if not any(file.content_type.endswith(ext) for ext in ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']):
        raise HTTPException(status_code=400, detail="Formato de imagem não suportado.")

    try:
        image_bytes = await file.read()

        temp_file_path = f"temp_{file.filename}"

        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(image_bytes)

        with Image.open(temp_file_path) as img:
            if img.width > 512 or img.height > 512:
                img.thumbnail((512, 512))
                img.save(temp_file_path)

        container_name = os.getenv("CONTAINER_NAME")
        app_name = os.getenv("APP_NAME")
        connection_string = os.getenv("BLOB_CONNECTION_STRING")

        blob = BlobClient.from_connection_string(conn_str=connection_string, container_name=container_name,
                                                 blob_name=temp_file_path)

        with open(temp_file_path, "rb") as file:
            blob.upload_blob(file)

        image_url = f"https://{app_name}.blob.core.windows.net/{container_name}/{temp_file_path}"

        os.remove(temp_file_path)

        response = comment_on_image(image_url)

        blob.delete_blob()

        if "card" in response or "trello" in response:
            response = ask_gpt(
                "Extraia o título e descrição da frase e transforme em json formatado com title e description na raiz do objeto ignorando palavra card: " +
                response)
            card_info = extract_card_info(response)

            if card_info:
                result = await create_trello_card(response)
                return {**result, "author": True, "response": response}

            return {
                "message": "Não foi possível entender sua mensagem. Tente por exemplo: Criar um card com titulo Minha task e descrição Minha primeira task",
                "author": True, "response": response}
        else:
            return {"message": response, "author": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
