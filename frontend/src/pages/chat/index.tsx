import React, { useState } from "react";
import TextArea from "../../components/TextArea";
import { Container, ContainerBackground } from "./style";
import Body from "../../components/Body";
import Header from "../../components/Header";

const ChatPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return(
        <Container>
            <ContainerBackground>
                <Header/>
                <Body isLoading={isLoading}/>
                <TextArea setIsLoading={setIsLoading} />
            </ContainerBackground>
            <></>
        </Container>
    );
}

export default ChatPage;