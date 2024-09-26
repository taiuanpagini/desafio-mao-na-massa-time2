import React from "react";
import { Button, ContainerButtonFlex, ModalContainer, ModalContent } from "./style";
import cam from "../../assets/cam.svg";
import audio from "../../assets/audio.svg";

const ModalAttachment: React.FC = () => {
    const handleBtn1Click = () => {
        alert('Botão 1 clicado');
      };
    
      const handleBtn2Click = () => {
        alert('Botão 2 clicado');
      };

   return (
      <ModalContent>
        <ContainerButtonFlex>
            <img src={cam}/><Button onClick={handleBtn1Click}>Imagem</Button>
        </ContainerButtonFlex>
        <ContainerButtonFlex>
            <img src={audio}/><Button onClick={handleBtn2Click}>Audio</Button>
        </ContainerButtonFlex>
      </ModalContent>
  );
}

export default ModalAttachment;