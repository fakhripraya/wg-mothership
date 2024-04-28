import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PageLoading from "./pages/PageLoading";

//TODO: Color references
// -#28272d dark color
// -#f2f3f2 light gray color
// -#fcfdfc light color
// -#6788c4 blue color

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <PageLoading
          className={"visible"}
          loadingMessage={"Loading sebentar..."}
        />
      }
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
