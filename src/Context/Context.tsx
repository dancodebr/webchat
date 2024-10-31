import React, { createContext, useState, ReactNode, FC } from 'react';

interface ContextProps {
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  chat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: {
    id: string;
    name: string;
  };
  setDataUser: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
  update: any;
  setUpdate: React.Dispatch<React.SetStateAction<any>>;
}

export const ContextTsx = createContext<ContextProps>({
  width: "0%",
  setWidth: () => {},
  chat: false,
  setChat: () => {},
  dataUser: { id: "", name: "" },
  setDataUser: () => {},
  update: null,
  setUpdate: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider: FC<ProviderProps> = ({ children }) => {
  const [width, setWidth] = useState("0%");
  const [chat, setChat] = useState(false);
  const [dataUser, setDataUser] = useState({ id: "", name: "" });
  const [update, setUpdate] = useState<any>(null);

  return (
    <ContextTsx.Provider value={{ width, setWidth, chat, setChat, dataUser, setDataUser, update, setUpdate }}>
      {children}
    </ContextTsx.Provider>
  );
};
