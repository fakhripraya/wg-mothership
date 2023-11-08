import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index"; // Replace with your actual reducers
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root", // Storage key
  version: 1,
  storage, // Use the storage library
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Other configuration options can be provided here,
// Such as middleware, dev tools, etc.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store, {
  onError: (error) => {
    // Handle the error here
    console.error("Redux-persist error:", error);
  },
});
