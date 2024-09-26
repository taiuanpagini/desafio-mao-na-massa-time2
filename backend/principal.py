from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from pydub import AudioSegment
from tempfile import NamedTemporaryFile
import requests
import io
import openai
import re
from unidecode import unidecode
from datetime import datetime, timedelta
import speech_recognition as sr
import os

from pydantic import BaseModel

class MessageRequest(BaseModel):
	message: str

app = FastAPI()

TRELLO_KEY = ""
TRELLO_TOKEN = ""
TRELLO_BOARD_ID = ""
TRELLO_LIST_ID = ""

OPENAI_API_KEY = ""
#OPENAI_API_KEY = ""
openai.api_key = OPENAI_API_KEY

conversation_states = {}

def ask_llama(prompt):
	try:
		response = openai.ChatCompletion.create(
			model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": prompt}],
			max_tokens=100
		)
		return response.choices[0].message['content']
	except openai.error.RateLimitError:
		return "Atingido o limite de requisições."

def extract_card_info(message):
	normalized_message = unidecode(message)

	match = re.search(
		r'(titulo|título)\s*([\w\s]+?)\s*(e\s*com|e|ou)\s*(descricao|descrição)\s*(.*)', 
		normalized_message, 
		re.IGNORECASE
	)

	if match:
		return {"title": match.group(2).strip(), "description": match.group(5).strip()}

	match = re.search(r'(titulo|título)\s*([\w\s]+)', normalized_message, re.IGNORECASE)
	if match:
		title = match.group(2).strip()
		return {"title": title, "description": "Sem descricao."}

	match = re.search(r'(descricao|descrição)\s*(.*)', normalized_message, re.IGNORECASE)
	if match:
		description = match.group(2).strip()
		return {"title": "Sem titulo.", "description": description}

	return None

async def create_trello_card(card_info):
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
    	return {"message": "Card criado com sucesso no Trello!", "card_info": card_info}
    else:
        raise HTTPException(status_code=trello_response.status_code, detail="Erro ao criar card no Trello")

@app.post("/chat_mensagem/")
async def chat_mensagem(request: Request, message_request: MessageRequest):
	user_id = request.client.host
	message = message_request.message
	due_date = (datetime.now() + timedelta(weeks=1)).isoformat()

	card_info = extract_card_info(message)
	if card_info:
			result = await create_trello_card(card_info)
			return {**result, "author": True}

	initial_response = ask_llama(message)
	return {"message": "Não foi possível entender sua mensagem. Tente por exemplo: Criar um card", "author": True}

@app.post("/chat_audio/")
async def chat_audio(file: UploadFile = File(...)):
	if not file.filename.endswith(('.wav', '.mp3', '.flac', '.ogg')):
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

		response = ask_llama(transcript['text'])

		os.remove(temp_file_path)

	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
	
	card_info = extract_card_info(transcript['text'])
	if card_info:
			result = await create_trello_card(card_info)
			return {**result, "author": True}

	return {"message": "Não foi possível entender sua mensagem. Tente por exemplo: Criar um card", "author": True}