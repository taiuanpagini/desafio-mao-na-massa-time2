import React, { useRef, useState } from "react";
import { Container, ContainerInput, Mic, Plus, TextInput } from "./style";
import mic from "../../assets/mic.svg";
import notMic from "../../assets/notMic.svg";
import plus from "../../assets/plus.svg";
import notPlus from "../../assets/notPlus.svg";
import { ChatService } from "../../services/chatService";
import { useMessageContext } from "../../Context/MessageContextProvider";
import ModalAttachment from "../modalAttachment";

interface IProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea: React.FC<IProps> = ({ setIsLoading}) => {
    const [inputText, setInputText] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef: any = useRef(null);
    const chunksRef: any = useRef([]);
    const {updateMessageList, messageList} = useMessageContext();
    
    const chatService = new ChatService();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            updateMessageList(false, inputText);
            setInputText('');
            submitMessage(inputText);
        }
    };

    const submitMessage = async (message: string) => {
        await chatService.createCardMessage(message).then((response) => {
            setIsLoading(true);
            updateMessageList(response?.data.author || true, response?.data.message || "Error backend");
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });

        return;
      };

      const startRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.onstop = handleStop;

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start();

                setIsRecording(true);
            } catch (err) {
                console.error('Error accessing audio devices:', err);
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

      const handleOpenModal = () => {
        setOpenModal(!openModal);
        return;
      };

      const handleOpenMic = () => {
        setIsRecording(!isRecording);

        if (!isRecording) {
            startRecording()
        }

        if (isRecording) {
            stopRecording()
        }

        return;
      };

      const handleDataAvailable = async (event: any) => {
        if (event.data.size > 0) {
            const chunk = event.data;
            chunksRef.current.push(chunk);
            await sendChunkToAPI(chunk);
        }
    };

    const handleStop = () => {
        chunksRef.current = [];
    };

    const sendChunkToAPI = async (chunk: any) => {
        const formData = new FormData();
        formData.append('file', chunk,);

        try {
            await chatService.createCardAudio(formData);
        } catch {
            stopRecording();
        }
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
            <Mic src={isRecording ? notMic : mic} onClick={() => handleOpenMic()}/>
            </ContainerInput>
        </Container>
    );
}

export default TextArea;