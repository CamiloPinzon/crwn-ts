import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface UserProviderInterface {
  children: ReactNode;
}

export type UserContext = {
  currentUser: object | null;
  setCurrentUser: Dispatch<SetStateAction<object | null>>;
};

export const GlobalUserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider: React.FC<UserProviderInterface> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  return (
    <GlobalUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalUserContext.Provider>
  );
};
