import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";
import { RoutesLinks } from "../../routes/routes.enum";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate(RoutesLinks.CHECKOUT);
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem key={index} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}> Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
