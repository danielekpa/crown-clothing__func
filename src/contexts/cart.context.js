import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();
export function CartContextProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    setCartTotal(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0));
  }, [cartItems])

  const addItemToCart = (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
  const removeItemFromCart = (product) => {
    // find the cart item to remove
    if (cartItems.find(item => item.id === product.id)) {
      // check if quantity is equal to 1, if it is remove that item from the cart
      if (product.quantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
        return
      }
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
      return
    }
  }

  const clearItemFromCart = (product) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
  }

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, cartCount, cartTotal, toggleIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart }}>{children}</CartContext.Provider>
  )
}
