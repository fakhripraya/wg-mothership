import { createSlice } from "@reduxjs/toolkit";
import {
  KEY_CREATIVE_STORE,
  NO_STRING,
} from "../../../../variables/global";

const creativeStoreReducer = createSlice({
  name: KEY_CREATIVE_STORE,
  initialState: {
    openTab: NO_STRING,
  },
  reducers: {
    setOpenTab: (state, action) => {
      state.openTab = action.payload;
    },
  },
});

export const { setOpenTab } = creativeStoreReducer.actions;
export default creativeStoreReducer.reducer;
