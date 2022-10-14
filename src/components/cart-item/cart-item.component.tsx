import { ProductType } from "../../types/product.type";

import "./cart-item.styles.scss";

interface CartItemInterface {
  cartItem: ProductType;
}

const CartItem = ({ cartItem }: CartItemInterface) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name}/>
      <div className="item-details">
        <span>{name}</span>
        <span>{quantity} x ${price*quantity}</span>
      </div>
    </div>
  );
};

export default CartItem;
