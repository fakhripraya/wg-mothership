import { createSlice } from "@reduxjs/toolkit";
import { KEY_NAVBAR } from "../../../../variables/global";

const navbarReducer = createSlice({
  name: KEY_NAVBAR,
  initialState: {
    overridingToggle: null,
  },
  reducers: {
    setOverridingToggle: (state, action) => {
      state.overridingToggle = action.payload;
    },
  },
});

export const { setOverridingToggle } =
  navbarReducer.actions;
export default navbarReducer.reducer;
