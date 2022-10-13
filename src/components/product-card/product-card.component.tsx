import { useContext } from "react";

import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";

import "./product-card.styles.scss";

interface ProductInterface {
  id?: number;
  imageUrl?: string;
  name?: string;
  price?: number;
}

const ProductCard = (product: ProductInterface) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductHandler = () => {
    addItemToCart(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductHandler}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;
