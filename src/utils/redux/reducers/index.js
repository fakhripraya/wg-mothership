import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import navbarReducer from "./navbarReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  navbar: navbarReducer,
});

export default rootReducer;
