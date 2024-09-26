import React, { useEffect, useRef, useState } from "react";
import { Container, ContainerInput, TextInput } from "./style"
import send from "../../assets/send.svg"
import plus from "../../assets/plus.svg"
import { IResponse } from "../../models/chatModel";

interface IProps {
    setMessageList: React.Dispatch<React.SetStateAction<IResponse[]>>;
}

const TextArea = ({ setMessageList }: IProps) => {
    // const bottomRef = useRef()
    // const messageRef = useRef()

    // const handleSubmit = () => {
    //     const message = messageRef.current?.value
    //     if(!message.trim()) return

    //     //socket.emit('message', message)
    //     clearInput()
    //     focusInput()
    // }

    // const clearInput = () => {
    //     messageRef.current.value = ''
    // }

    // const focusInput = () => {
    //     messageRef.current.focus()
    // }

    // const getEnterKey = (e: any) => {
    //     if(e.key === 'Enter')
    //     handleSubmit()
    // }

    return(
        <Container>
            <ContainerInput>
            {/* <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" /> */}
            {/* <TextInput placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)}/> */}
            <img src={plus}/>
            <TextInput placeholder='Digite uma mensagem'/>
            <img src={send}/>
            {/* <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" /> */}
            </ContainerInput>
        </Container>
    );
}

export default TextArea;