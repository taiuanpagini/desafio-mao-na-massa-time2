import React, { useState } from "react";
import TextArea from "../../components/TextArea";
import { Container, ContainerBackground } from "./style";
import { IResponse } from "../../models/chatModel";
import Body from "../../components/Body";

const ChatPage = () => {
    const messageListMock: IResponse[] = [
        {author: 1, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
        {author: 2, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
        {author: 1, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
        {author: 2, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    ] 
    const [messageList, setMessageList] = useState<IResponse[]>(messageListMock);

    return(
        <Container>
            <ContainerBackground>
                <Body messageList={messageList}/>
                <TextArea setMessageList={setMessageList}/>
            </ContainerBackground>
        </Container>
    );
}

export default ChatPage;