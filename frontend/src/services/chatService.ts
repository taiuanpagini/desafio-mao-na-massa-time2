import { AxiosResponse } from 'axios';
import axios from '../axiosConfig';
import { IResponse } from '../models/chatModel';

// const headers = {
//     "Accept": "*/*",
//     "Content-Type": "application/json" 
//   };

export class ChatService {
    
    createCardMessage = async (message: string): Promise<AxiosResponse<IResponse> | undefined> => {
        try {
            const response = await axios.post<IResponse>("/chat_mensagem/", { message });
            console.log("retorno", response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    
    createCardAudio = async (audio: FormData): Promise<AxiosResponse<IResponse> | undefined> => {
        try {
      const response = await axios.post<IResponse>("/chat_audio/", { audio });
      return response;
    } catch (error) {
        console.log(error);
    }
};
}