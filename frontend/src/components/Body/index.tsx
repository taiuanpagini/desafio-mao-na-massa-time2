import React, { useEffect, useMemo, useRef } from "react";
import { Container, ImageFront, MessageBackend, MessageFront } from "./style";
import { IResponse } from "../../models/chatModel";
import { useMessageContext } from "../../Context/MessageContextProvider";

interface IProps {
    isLoading: boolean;
}

const Body: React.FC<IProps> = ({ isLoading }) => {
    const { messageList } = useMessageContext();
    const render = (item: IResponse, index: number) => {
        if (!item.author && item.type === "text") return <MessageFront key={index}>{item.message}</MessageFront>;
        if (item.author && item.type === "text") return <MessageBackend key={index}>{item.message}</MessageBackend>;

        if (!item.author && item.type === "audio") {
            return (
                <MessageFront key={index}><audio controls>
                  <source src={item.message} type="audio/wav" />
                </audio></MessageFront>
              )
        }

        if (!item.author && item.type === "image") {
            console.log(item.message);
            return (
                <MessageFront key={index}><ImageFront src={item.message} /></MessageFront>
            )
        }

        return;
    }

    return(
        <Container>
            {messageList?.map((item, index) => (
                render(item, index)
            )).reverse()}

        </Container>
    );
}

export default Body;