import React, { useState } from "react";
import TextArea from "../../components/TextArea";
import { Container, ContainerBackground } from "./style";
import { IResponse } from "../../models/chatModel";
import Body from "../../components/Body";
import Header from "../../components/Header";

const ChatPage = () => {
    const messageListMock: IResponse[] = [
        {author: 1, message: "okoks"},
        {author: 2, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
        {author: 1, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
        {author: 2, message: "okokossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    ] 
    const [messageList, setMessageList] = useState<IResponse[]>(messageListMock);

    return(
        <Container>
            <Header></Header>
            <Body messageList={messageList}/>
            <TextArea setMessageList={setMessageList}/>
        </Container>
    );
}

export default ChatPage;