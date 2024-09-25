from fastapi import FastAPI, HTTPException, Request
import requests
import openai

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
#OPENAI_API_KEY = "" #taiuan.pagini@gmail.com
OPENAI_API_KEY = "" #taiuan.michele@gmail.com
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

@app.post("/chat/")
async def chat(request: Request, message_request: dict):
	user_id = request.client.host  # Usa o IP do usuário como identificador único
	message = message_request.get("message", "")  # Obtém a mensagem do corpo da requisição

	# Se o usuário já iniciou uma conversa e estamos aguardando o texto do card
	if user_id in conversation_states:
		if conversation_states[user_id] == "awaiting_card_text":
			# Recebe o texto do card e cria o card no Trello
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

	# Se for a primeira mensagem do usuário ou se o estado da conversa foi reiniciado
	initial_response = ask_llama(message)

	# Se o usuário pedir para criar um card no Trello, aguardamos o texto do card
	if "criar um card" in message.lower():
		conversation_states[user_id] = "awaiting_card_text"
		return {"message": "Claro! Qual seria o texto do card que você deseja criar?"}

	# Se não for um pedido de criação de card, continuamos com a resposta da Llama
	return {"message": initial_response}