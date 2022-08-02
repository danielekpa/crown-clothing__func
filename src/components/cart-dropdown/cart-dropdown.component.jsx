import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {CartContext} from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const navigate = useNavigate();
  const {cartItems, toggleIsCartOpen} = useContext(CartContext);

  const goToCheckout = () => {
    toggleIsCartOpen();
    navigate("./checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem cartItem={item} key={`item-${index}`} />
        ))}
      </div>
      <Button onClick={goToCheckout}>Go TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
