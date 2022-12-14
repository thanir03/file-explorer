import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FileContextProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FileContextProvider>
    <App />
  </FileContextProvider>
);
