import { ReactNode } from "react";
import { IResponse } from "../models/chatModel";

export type MessageContextType = {
  messageList: IResponse[];
  setMessageList: React.Dispatch<React.SetStateAction<IResponse[]>>
  updateMessageList: (author: boolean, message:string, type?: string) => void;
};

export type MessageContextProviderProps = {
  children: ReactNode;
};