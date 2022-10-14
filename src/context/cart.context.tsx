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
  removeItemToCart: Dispatch<SetStateAction<any>>;
  deleteItemFromCart: Dispatch<SetStateAction<any>>;
  cartCount: number;
  setCartCount?: Dispatch<SetStateAction<number>>;
  cartTotal: number;
  setCartTotal?: Dispatch<SetStateAction<number>>;
};

const addCartItem = (
  cartItems: ProductType[],
  productToAdd: ProductType
): any => {
  const exist = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (exist) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity! + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: ProductType[],
  cartItemToRemove: ProductType
): any => {
  const exist = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (exist!.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity! - 1 }
      : cartItem
  );
};

const deleteCartItem = (
  cartItems: ProductType[],
  cartItemToDelete: ProductType
): any => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
};

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  removeItemToCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  cartTotal: 0,
  setCartTotal: () => {},
});

export const CartProvider: React.FC<CartInterfacace> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total: number, cartItem: ProductType) => {
        return total + cartItem.quantity!;
      }, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce((total: number, cartItem: ProductType) => {
        return total + cartItem.quantity! * cartItem.price!;
      }, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd: ProductType) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove: ProductType) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const deleteItemFromCart = (cartItemToDele: ProductType) => {
    setCartItems(deleteCartItem(cartItems, cartItemToDele));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
