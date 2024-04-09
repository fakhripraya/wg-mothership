import { createSlice } from "@reduxjs/toolkit";
import { KEY_CART } from "../../../../variables/global";

const cartReducer = createSlice({
  name: KEY_CART,
  initialState: [],
  reducers: {
    setItem: (state, action) => action.payload,
    removeItem: () => null,
  },
});

export const { setItem, removeItem } = cartReducer.actions;
export default cartReducer.reducer;
