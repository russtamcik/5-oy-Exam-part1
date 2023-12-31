import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import StoreProvider from "./redux/store/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StoreProvider>
  </React.StrictMode>
);
