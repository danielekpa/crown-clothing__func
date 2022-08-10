import React, { createContext, useEffect, useState } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase.util';

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState([]);

  useEffect(() => {
    const categories = async () => await getCategoriesAndDocuments();
    categories().then((map) => setCategoriesMap(map))
  }, [])

  return (
    <CategoriesContext.Provider value={{ categoriesMap }}>{children}</CategoriesContext.Provider>
  )
}
