import React, { useState } from "react";
import { Container, ContainerInput, Mic, Plus, TextInput } from "./style";
import mic from "../../assets/mic.svg";
import plus from "../../assets/plus.svg";
import notPlus from "../../assets/notPlus.svg";
import { ChatService } from "../../services/chatService";
import { useMessageContext } from "../../Context/MessageContextProvider";
import ModalAttachment from "../modalAttachment";

interface IProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea = ({ setIsLoading}: IProps) => {
    const [inputText, setInputText] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {updateMessageList, messageList} = useMessageContext();
    
    const chatService = new ChatService();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        event.preventDefault();
            console.log(inputText);
        // Salvar o texto digitado no array

        updateMessageList(false, inputText);
        
        // Limpar o input
        setInputText('');
        
        // Disparar uma função
        submitMessage(inputText);
        }
    };

    const submitMessage = async (message: string) => {
        await chatService.createCardMessage(message).then((response) => {
            setIsLoading(true);
            updateMessageList(response?.data.author || true, response?.data.message || "Error backend");
        }).catch((error) => {
            console.log("erro na requisição");
        }).finally(() => {
            setIsLoading(false);
            console.log("lista",messageList);
        });

        return;
      };

      const handleOpenModal = () => {
        setOpenModal(!openModal);
        return;
      };

    return(
        <Container>
            <ContainerInput>
                <div>{openModal && <ModalAttachment />}</div>
            <Plus src={openModal ? notPlus : plus} onClick={() => handleOpenModal()}/>
            <TextInput type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder='Digite uma mensagem'
                />
            <Mic src={mic}/>
            </ContainerInput>
        </Container>
    );
}

export default TextArea;