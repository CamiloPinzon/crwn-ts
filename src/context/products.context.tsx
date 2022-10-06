import { createContext, ReactNode, useState } from "react";

import PRODUCTS_DATA from "../shop.data.json";

interface ProductsInterface {
  children: ReactNode;
}

export type ProductType = {
  id?: number;
  name?: string;
  imageUrl?: string;
  price?: number;
};

export type ProductsType = [product: ProductType];

export const ProductsContext = createContext({
  products: [{}],
});

export const ProductsProvider: React.FC<ProductsInterface> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
