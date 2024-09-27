import React from "react";
import TextArea from "../../components/TextArea";
import { Container, ContainerBackground } from "./style";
import Body from "../../components/Body";
import Header from "../../components/Header";

const ChatPage: React.FC = () => {
    return(
        <Container>
            <ContainerBackground>
                <Header/>
                <Body />
                <TextArea />
            </ContainerBackground>
            <></>
        </Container>
    );
}

export default ChatPage;