import { createSlice } from "@reduxjs/toolkit";
import {
  KEY_CREATIVE_STORE,
  NO_STRING,
} from "../../../../variables/global";

const creativeStoreReducer = createSlice({
  name: KEY_CREATIVE_STORE,
  initialState: {
    openTab: NO_STRING,
    featureModal: {
      modal: NO_STRING,
      toggle: false,
      title: null,
    },
    errorModal: false,
  },
  reducers: {
    setOpenTab: (state, action) => {
      state.openTab = action.payload;
    },
    setFeatureModal: (state, action) => {
      state.featureModal = action.payload;
    },
    setErrorModal: (state, action) => {
      state.errorModal = action.payload;
    },
  },
});

export const {
  setOpenTab,
  setFeatureModal,
  setErrorModal,
} = creativeStoreReducer.actions;
export default creativeStoreReducer.reducer;
