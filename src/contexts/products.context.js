import React, { createContext, useState } from 'react'
import PRODUCTS from "../constants/shop-data.json";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);

  return (
    <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
  )
}
