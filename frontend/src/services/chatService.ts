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
    
    createCardAudio = async (form: FormData): Promise<AxiosResponse<IResponse> | undefined> => {
       try {
            const response = await axios.post<IResponse>("/chat_audio/", form, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    createCardImage = async (form: FormData): Promise<AxiosResponse<IResponse> | undefined> => {
        try {
             const response = await axios.post<IResponse>("/chat_image/", form, {
                 headers: {
                 'Content-Type': 'multipart/form-data'
                 }
             });
             return response;
         } catch (error) {
             console.log(error);
         }
     };
}