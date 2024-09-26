import React, { useEffect, useMemo, useRef } from "react";
import { Container, MessageBackend, MessageFront } from "./style";
import { IResponse } from "../../models/chatModel";
import { useMessageContext } from "../../Context/MessageContextProvider";

interface IProps {
    isLoading: boolean;
}

const Body = ({ isLoading }: IProps) => {
    //const bottomRef = useRef();
    const { messageList } = useMessageContext();
    const render = (item: IResponse) => {
        return !item.author ? 
                    <MessageFront>{item.message}</MessageFront>
                    :
                    <MessageBackend>{item.message}</MessageBackend>
    }

    // const MessageListMemo = useMemo(() => {
    //     return messageList;
    // }, [messageList]);

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