import React, { useRef, useState } from "react";
import { Container, ContainerInput, DivInput, Mic, Plus, TextInput } from "./style";
import mic from "../../assets/mic.svg";
import notMic from "../../assets/notMic.svg";
import plus from "../../assets/plus.svg";
import notPlus from "../../assets/notPlus.svg";
import { ChatService } from "../../services/chatService";
import { useMessageContext } from "../../Context/MessageContextProvider";
import ModalAttachment from "../modalAttachment";


const TextArea: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const {updateMessageList} = useMessageContext();
    
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
            updateMessageList(response?.data.author || true, response?.data.message || "Error backend", "text", response?.data.card_url);
        }).catch((error) => {
            console.log(error);
        });

        return;
      };

      const startRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);

                // mediaRecorder.ondataavailable = handleDataAvailable;
                // mediaRecorder.onstop = handleStop;

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start();

                mediaRecorder.ondataavailable = (event: BlobEvent) => {
                    audioChunksRef.current.push(event.data);
                }

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav'});
                    const audioUrl = URL.createObjectURL(audioBlob);
                    updateMessageList(false, audioUrl, "audio");
                    setInputText('')
                    sendChunkToAPI(audioBlob);
                    audioChunksRef.current = [];
                }

                setIsRecording(true);
            } catch (err) {
                console.error('Error accessing audio devices:', err);
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }

    };

      const handleOpenModal = () => {
        setOpenModal(!openModal);
        return;
      };

      const handleOpenMic = () => {
        setIsRecording(!isRecording);

        if (!isRecording) {
            startRecording();
        }

        if (isRecording) {
            stopRecording()
        }

        return;
      };

    const sendChunkToAPI = async (chunk: Blob) => {
        const formData = new FormData();
        formData.append('file', chunk);
        console.log("teste", chunk);
        console.log("teste form", formData);
        try {
            await chatService.createCardAudio(formData).then((response) => {
                updateMessageList(response?.data.author || true, response?.data.message || "Error backend", "text", response?.data.card_url);
            });
        } catch {
            stopRecording();
        }
    };

    return(
        <Container>
            <ContainerInput>
                <DivInput>
                    {openModal && <ModalAttachment setOpenModal={setOpenModal} />}
                    <Plus openModal={openModal} src={openModal ? notPlus : plus} onClick={() => handleOpenModal()}/>
                </DivInput>
            <TextInput type="text"
                value={isRecording ? "Gravando......" : inputText}
                onChange={(e) => !isRecording && setInputText(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder='Digite uma mensagem'
                />
            <Mic isRecord={isRecording} src={isRecording ? notMic : mic} onClick={() => handleOpenMic()}/>
            </ContainerInput>
        </Container>
    );
}

export default TextArea;