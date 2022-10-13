import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { ProductType } from "../types/product.type";

interface CartInterfacace {
  children: ReactNode;
}

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductType[];
  setCartItems?: Dispatch<SetStateAction<ProductType[] | ProductType>>;
  addItemToCart: Dispatch<SetStateAction<any>>;
};

const addCartItem = (
  cartItems: ProductType[],
  productToAdd: ProductType
): any => {
  const exist = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (exist) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity! + 1 };
      } else {
        return cartItem;
      }
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
});

export const CartProvider: React.FC<CartInterfacace> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd: ProductType) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
