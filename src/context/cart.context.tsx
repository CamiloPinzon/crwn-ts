import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
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
  cartCount: number;
  setCartCount?: Dispatch<SetStateAction<number>>;
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
  cartCount: 0,
  setCartCount: () => {},
});

export const CartProvider: React.FC<CartInterfacace> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total: number, cartItem:ProductType)=>{
        return total + cartItem.quantity;
      }, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd: ProductType) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
