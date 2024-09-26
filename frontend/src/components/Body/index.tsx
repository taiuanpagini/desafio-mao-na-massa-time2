import React, { useEffect, useMemo, useRef } from "react";
import { Container, MessageBackend, MessageFront } from "./style";
import { IResponse } from "../../models/chatModel";
import { useMessageContext } from "../../Context/MessageContextProvider";

interface IProps {
    isLoading: boolean;
}

const Body: React.FC<IProps> = ({ isLoading }) => {

    const { messageList } = useMessageContext();
    const render = (item: IResponse) => {
        if(!item.author && item.type === "text") return <MessageFront>{item.message}</MessageFront>;
        if(item.author && item.type === "text") return <MessageBackend>{item.message}</MessageBackend>;

        if(!item.author && item.type === "audio") {
            return (
                <MessageFront><audio controls>
                  <source src={item.message} type="audio/wav" />
                </audio></MessageFront>
              )
        }

        return;
    }

    return(
        <Container>
            {messageList?.map((item) => (
                render(item)
            )).reverse()}

            {isLoading && <MessageBackend>Esperando resposta</MessageBackend>}
        </Container>
    );
}

export default Body;