import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 120px;
  right: 320px;
  width: 100%;
  height: 100%;
  
`;

export const ModalContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  border-radius: 5px;
  position: fixed;
  top: 515px;
  left: 300px;
  border: solid #F5E2DC 1px;
  width: 167px;
  height: 120px; 
  border-radius: 8px;
  
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;

  border: none;
  background-color: white;
  color: #000000;
  cursor: pointer;

  font-family: Mundial;
  font-size: 20px;
  font-weight: 300;
  line-height: 18.96px;
  text-align: left;
  

`;

export const ContainerButtonFlex = styled.div `
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
    gap: 10px

`;