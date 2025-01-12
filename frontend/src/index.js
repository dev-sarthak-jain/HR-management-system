import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { persistor, store } from "./store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

// Use createRoot from "react-dom/client"
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading</div>}>
        <App />
      </PersistGate>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
