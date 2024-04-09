import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartReducer";
import navbarReducer from "./navbar/navbarReducer";
import creativeStoreReducer from "./creativeStore/creativeStoreReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  creativeStore: creativeStoreReducer,
  navbar: navbarReducer,
});

export default rootReducer;
