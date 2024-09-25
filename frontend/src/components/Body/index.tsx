import React, { useEffect, useMemo, useRef } from "react";
import { Container, MessageBackend, MessageFront } from "./style";
import { IResponse } from "../../models/chatModel";

interface IProps {
    messageList: IResponse[];
}

const Body = ({ messageList }: IProps) => {
    //const bottomRef = useRef();

    // const scrollDown = () => {
    //     bottomRef.current.scrollIntoView({behavior: 'smooth'})
    // }

    const MessageListMemo = useMemo(() => {
        return messageList;
    }, [messageList]);

    return(
        <Container>
            {MessageListMemo?.map((item) => (
                item.author === 1 ? 
                    <MessageFront>{item.message}</MessageFront>
                    :
                    <MessageBackend>{item.message}</MessageBackend>
            ))}
        </Container>
    );
}

export default Body;