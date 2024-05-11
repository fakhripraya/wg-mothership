import { createSlice } from "@reduxjs/toolkit";
import { KEY_USER } from "../../../../variables/global";

const userReducer = createSlice({
  name: KEY_USER,
  initialState: {
    roles: null,
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { setRoles } = userReducer.actions;
export default userReducer.reducer;
