import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface CartInterfacace {
    children: ReactNode;
}

type CartContextType = {
    isCartOpen: boolean;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider: React.FC<CartInterfacace> = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return <CartContext.Provider value={{isCartOpen, setIsCartOpen}}>{children}</CartContext.Provider>
}