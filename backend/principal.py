from fastapi import FastAPI, HTTPException, Request
import requests
import openai
import re
from unidecode import unidecode
from datetime import datetime, timedelta

from pydantic import BaseModel

class MessageRequest(BaseModel):
	message: str

app = FastAPI()

# Configurações do Trello
TRELLO_KEY = ""
TRELLO_TOKEN = ""
TRELLO_BOARD_ID = ""
TRELLO_LIST_ID = ""

# Configurações do OpenAI
#OPENAI_API_KEY = ""
OPENAI_API_KEY = ""
openai.api_key = OPENAI_API_KEY

# Armazenamento do estado da conversa (para fins de demonstração simples)
conversation_states = {}

# Função para chamar o modelo da OpenAI
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

# Função para extrair título e descrição da mensagem
def extract_card_info(message):
	normalized_message = unidecode(message)

	match = re.search(
		r'(titulo|título)\s*([\w\s]+?)\s*(e\s*com|e|ou)\s*(descricao|descrição)\s*(.*)', 
		normalized_message, 
		re.IGNORECASE
	)

	if match:
		return {"title": match.group(2).strip(), "description": match.group(5).strip()}

	# Se não capturou, tenta uma outra abordagem
	match = re.search(r'(titulo|título)\s*([\w\s]+)', normalized_message, re.IGNORECASE)
	if match:
		title = match.group(2).strip()
		return {"title": title, "description": "Sem descricao."}

	match = re.search(r'(descricao|descrição)\s*(.*)', normalized_message, re.IGNORECASE)
	if match:
		description = match.group(2).strip()
		return {"title": "Sem titulo.", "description": description}

	return None

@app.post("/chat/")
async def chat(request: Request, message_request: MessageRequest):
	user_id = request.client.host
	message = message_request.message
	due_date = (datetime.now() + timedelta(weeks=1)).isoformat()

	# Tenta extrair informações de criação de card
	card_info = extract_card_info(message)
	if card_info:
		# Criar o card no Trello
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

	# Se não foi um pedido de criação de card, processa normalmente
	initial_response = ask_llama(message)
	return {"message": initial_response}