import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

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
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      user ? createUserDocumentFromAuth(user) : setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <GlobalUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalUserContext.Provider>
  );
};
