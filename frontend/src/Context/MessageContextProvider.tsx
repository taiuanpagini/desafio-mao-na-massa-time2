import { createContext, useContext, useState } from "react";
import { IResponse } from "../models/chatModel";
import { MessageContextProviderProps, MessageContextType } from "./ContextInterface";

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider(props: MessageContextProviderProps) {
    const { children } = props;
    const [messageList, setMessageList] = useState<IResponse[]>([]);
  
    const updateMessageList = async (author: boolean, message:string) => {
      const newItem: IResponse = {author: author, message: message};
      setMessageList(prevItems => [...prevItems, newItem]);
    };
  
    return (
      <MessageContext.Provider value={{
        messageList,
        setMessageList,
        updateMessageList,
      }}>
        {children}
      </MessageContext.Provider>
    );
  }
  
  export const useMessageContext = () => {
    return useContext(MessageContext);
  };