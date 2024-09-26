import React, { useRef } from "react";
import { Button, ContainerButtonFlex, ModalContent } from "./style";
import cam from "../../assets/cam.svg";
import audio from "../../assets/audio.svg";
import { ChatService } from "../../services/chatService";

const ModalAttachment: React.FC = () => {
  const fileInputRef = useRef<any>(null);
  const chatService = new ChatService();

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
          await chatService.createCardAudio(formData)
        }
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