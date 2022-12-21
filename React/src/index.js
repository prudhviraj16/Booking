import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/Searchcontext";
import { AuthContextProvider } from "./context/Authcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </AuthContextProvider>
);
