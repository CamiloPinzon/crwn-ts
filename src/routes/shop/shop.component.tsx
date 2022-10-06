import React, { ReactNode, useContext } from "react";

import { ProductsContext, ProductType } from "../../context/products.context";

import "./shop.component";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      {products.map(({ id, name }: ProductType) => {
        return (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Shop;
