import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();
export function CartContextProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0)), [cartItems])

  const addItemToCart = (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, cartCount, toggleIsCartOpen, addItemToCart }}>{children}</CartContext.Provider>
  )
}
