import { createSlice } from "@reduxjs/toolkit";
import { KEY_CONSENT_SCREEN } from "../../../../variables/global";

const consentScreenReducer = createSlice({
  name: KEY_CONSENT_SCREEN,
  initialState: {
    errorModal: false,
  },
  reducers: {
    setErrorModal: (state, action) => {
      state.errorModal = action.payload;
    },
  },
});

export const { setErrorModal } =
  consentScreenReducer.actions;
export default consentScreenReducer.reducer;
