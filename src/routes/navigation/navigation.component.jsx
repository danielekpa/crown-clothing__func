import React, {useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {CartContext} from "../../contexts/cart.context";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase.util";
import "./navigation.styles.scss";

export default function Navigation() {
  const {currentUser} = useContext(UserContext);
  const {cartItems, isCartOpen} = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/shop">
            Contact
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              sign out
            </span>
          ) : (
            <Link className="nav-link" to="/auth/">
              Sign In
            </Link>
          )}
          <Link className="nav-link" to="/shop">
            Cart
          </Link>
          {!!cartItems.length && <CartIcon />}
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}
