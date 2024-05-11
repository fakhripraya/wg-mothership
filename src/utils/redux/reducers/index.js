import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";
import navbarReducer from "./navbar/navbarReducer";
import creativeStoreReducer from "./creativeStore/creativeStoreReducer";
import consentScreenReducer from "./consentScreen/consentScreenReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  consentScreen: consentScreenReducer,
  creativeStore: creativeStoreReducer,
  navbar: navbarReducer,
});

export default rootReducer;
