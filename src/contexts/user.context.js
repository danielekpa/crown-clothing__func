import React, { createContext, useEffect, useState } from "react";
import { onAuthStateListener } from "../utils/firebase.util";

// as the actual value to access
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function unsubscribe() {
      onAuthStateListener((user) => {
        return setCurrentUser(user)
      });
    }
    unsubscribe();
  }, []);

  /* const updateCurrentUser = (user) => {
    setCurrentUser(user);
  } */

  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>
    {children}
  </UserContext.Provider>
}