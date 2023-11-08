import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
