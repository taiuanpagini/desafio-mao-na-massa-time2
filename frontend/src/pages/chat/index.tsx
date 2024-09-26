import React, { useState } from "react";
import TextArea from "../../components/TextArea";
import { Container, ContainerBackground } from "./style";
import { IResponse } from "../../models/chatModel";
import Body from "../../components/Body";
import Header from "../../components/Header";

const ChatPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return(
        <Container>
            <ContainerBackground>
                <Body isLoading={isLoading}/>
                <TextArea setIsLoading={setIsLoading} />
            </ContainerBackground>
        </Container>
    );
}

export default ChatPage;