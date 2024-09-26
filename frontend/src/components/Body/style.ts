import styled from "styled-components";
 
export const ChatContainer = styled.div `
     height: 80vd;
    width: 400px;
    background-color: #fff;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
   
   
`;

export const Container = styled.div `
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    
`;
 
// export const ChatBody = styled.div `
//     padding: 0 10px;
//     height: 550px;
//     overflow-y: scroll;
//     display: flex;
//     flex-direction: column;
   
   
// `;
 
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