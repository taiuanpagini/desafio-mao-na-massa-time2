import React from 'react';
import { MessageContextProvider } from './MessageContextProvider';

const AppContextProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  return (
    <MessageContextProvider>
        {children}
    </MessageContextProvider>
  );
};

export default AppContextProvider;