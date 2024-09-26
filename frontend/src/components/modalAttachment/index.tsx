import React, { useRef } from "react";
import { Button, ContainerButtonFlex, ModalContent } from "./style";
import cam from "../../assets/cam.svg";
import audio from "../../assets/audio.svg";
import { ChatService } from "../../services/chatService";
import { useMessageContext } from "../../Context/MessageContextProvider";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAttachment: React.FC<IProps> = ({ setOpenModal }) => {
  const fileInputRef = useRef<any>(null);
  const chatService = new ChatService();
  const {updateMessageList} = useMessageContext();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

    const handleBtn1Click = () => {
        alert('sem funcionar');
      };
  

      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileData = event.target.files?.[0];
        if (fileData) {
          const formData = new FormData();
          formData.append('file', fileData);

          const audioBlob = new Blob([fileData], { type: 'audio/wav'});
          const audioUrl = URL.createObjectURL(audioBlob);
          updateMessageList(false, audioUrl, "audio");

          await chatService.createCardAudio(formData).then((response) => {
            updateMessageList(response?.data.author || true, response?.data.message || "Error backend");
          })
        }

        setOpenModal(false);
      };

   return (
      <ModalContent>
        <ContainerButtonFlex>
            <img src={cam}/><Button onClick={handleBtn1Click} disabled={true}>Imagem</Button>
        </ContainerButtonFlex>
        <ContainerButtonFlex>
          <>
            <img src={audio}/><Button onClick={handleButtonClick}>Áudio</Button> 
          </> 
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".wav, .flac, .mp3, .ogg" 
            onChange={handleFileChange}
          />
        </ContainerButtonFlex>
      </ModalContent>
  );
}

export default ModalAttachment;