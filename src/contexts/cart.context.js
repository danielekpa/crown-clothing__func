import React,{ createContext,useReducer } from 'react';
import { createAction } from '../utils/reducer.utils';

export const CartContext = createContext();

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
};

export function CartContextProvider({ children }) {

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { isCartOpen, cartItems, cartCount, cartTotal, } = state;

  const updateCartItemsReducer = (cartItems) => {
    /* dispatch new action with payload = { 
      newCartItems, newCartTotal, newCartCount
    } */

    const newCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const newCartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems, cartCount : newCartCount, cartTotal : newCartTotal}
    ))
  }

  const addItemToCart = (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      // setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      updateCartItemsReducer(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return
    }
    updateCartItemsReducer([...cartItems, { ...product, quantity: 1 }]);
  }
  const removeItemFromCart = (product) => {
    // find the cart item to remove
    if (cartItems.find(item => item.id === product.id)) {
      // check if quantity is equal to 1, if it is remove that item from the cart
      if (product.quantity === 1) {
        updateCartItemsReducer(cartItems.filter((cartItem) => cartItem.id !== product.id));
        return
      }
      updateCartItemsReducer(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
      return
    }
  }

  const clearItemFromCart = (product) => {
    updateCartItemsReducer(cartItems.filter((cartItem) => cartItem.id !== product.id));
  }

  const toggleIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN));
  }
  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, cartCount, cartTotal, toggleIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart }}>{children}</CartContext.Provider>
  )
}
