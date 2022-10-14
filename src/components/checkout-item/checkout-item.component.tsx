import { useContext } from "react";

import { CartContext } from "../../context/cart.context";
import { ProductType } from "../../types/product.type";

import "./checkout-item.styles.scss";

interface CheckoutItemInterface {
  cartItem: ProductType;
}

const CheckoutItem = ({ cartItem }: CheckoutItemInterface) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { deleteItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

    const removeItemHandler = () => removeItemToCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const deleteItemHandler = () => deleteItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">&nbsp;{quantity}&nbsp;</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">$ {quantity! * price!}</span>
      <div className="remove-button" onClick={deleteItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
