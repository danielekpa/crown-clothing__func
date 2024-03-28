import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
})