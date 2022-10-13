import { ProductType } from "../../types/product.type";

import "./cart-item.styles.scss";

interface CartItemInterface {
  cartItem: ProductType;
}

const CartItem = ({ cartItem }: CartItemInterface) => {
  const { name, quantity } = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  );
};

export default CartItem;
