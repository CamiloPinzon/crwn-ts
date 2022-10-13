import { useContext } from "react";

import { ProductsContext, ProductType } from "../../context/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

const Shop = (): JSX.Element => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product: ProductType) => {
        return <ProductCard {...product} />;
      })}
    </div>
  );
};

export default Shop;
