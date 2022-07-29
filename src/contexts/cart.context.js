import React, { createContext } from 'react'
import { useState } from 'react';

export const CartContext = createContext();
export function CartContextProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, toggleIsCartOpen }}>{children}</CartContext.Provider>
  )
}
