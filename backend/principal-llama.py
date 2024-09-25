from fastapi import FastAPI, HTTPException, Request
from transformers import AutoModelForCausalLM, AutoTokenizer
import requests
import os

app = FastAPI()

# Configuração do modelo LLaMA
model_name = "meta-llama/Llama-3.1-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Configurações do Trello
TRELLO_KEY = ""
TRELLO_TOKEN = ""
TRELLO_BOARD_ID = ""
TRELLO_LIST_ID = ""

# Armazenamento do estado da conversa (para fins de demonstração simples)
conversation_states = {}

def ask_llama(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=100)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

@app.post("/chat/")
async def chat(request: Request, message_request: dict):
	user_id = request.client.host
	message = message_request.get("message", "")

	if user_id in conversation_states:
		if conversation_states[user_id] == "awaiting_card_text":
			card_text = message
			
			# Criar o card no Trello
			url = "https://api.trello.com/1/cards"
			query = {
				'key': TRELLO_KEY,
				'token': TRELLO_TOKEN,
				'idList': TRELLO_LIST_ID,
				'name': card_text,
				'idLabels': ['66f2d6940b5765aab37c17a7'],
				'desc': 'Card criado via chatbot'
			}
			trello_response = requests.post(url, params=query)

			if trello_response.status_code == 200:
				# Reseta o estado da conversa após criar o card
				del conversation_states[user_id]
				return {"message": "Card criado com sucesso no Trello!"}
			else:
				raise HTTPException(status_code=trello_response.status_code, detail="Erro ao criar card no Trello")

	initial_response = ask_llama(message)

	if "criar um card" in message.lower():
		conversation_states[user_id] = "awaiting_card_text"
		return {"message": "Claro! Qual seria o texto do card que você deseja criar?"}

	return {"message": initial_response}