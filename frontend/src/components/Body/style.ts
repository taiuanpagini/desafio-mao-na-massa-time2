import styled from "styled-components";
 

export const Container = styled.div `
    height: 80%;
    width: 80%;
  padding: 0;
  margin: 0 auto;
  opacity: 90%;
  background: #FFFFFF;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    
`;

export const MessageBackend = styled.div `
    max-width: 544px;
    height: auto;
    background-color: #FFDEF6;
    word-wrap: break-word;
    color: #000;
    padding: 16px 16px;
    margin: 16px 0px 16px 86px;
    border-radius: 7px;
    align-self: start;
   
`;
 
export const MessageFront = styled.div `
    background-color: #68009F;
    height: auto;
    color: #fff;
    max-width: 544px;
    word-wrap: break-word;
    width: fit-content;
    padding: 16px 16px;
    margin: 16px 86px 16px 0px;
    border-radius: 7px;
    align-self: end;
`;

export const ImageFront = styled.img `
    height: 200px;
    width: 200px;

`;