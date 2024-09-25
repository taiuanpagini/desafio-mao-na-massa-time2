import React, { useEffect, useRef, useState } from "react";
import { Container, ContainerInput, TextInput } from "./style"
import mic from "../../assets/mic.svg"
import plus from "../../assets/plus.svg"

const TextArea = () => {
    // const bottomRef = useRef()
    // const messageRef = useRef()
    // const [messageList, setMessageList] = useState([])

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

    // const scrollDown = () => {
    //     bottomRef.current.scrollIntoView({behavior: 'smooth'})
    //   }

    // useEffect(()=>{
    //     scrollDown()
    // }, [messageList])

    return(
        <Container>
            <ContainerInput>
            {/* <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" /> */}
            {/* <TextInput placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)}/> */}
            <img src={plus}/>
            <TextInput placeholder='Digite uma mensagem'/>
            <img src={mic}/>
            {/* <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" /> */}
            </ContainerInput>
        </Container>
    );
}

export default TextArea;