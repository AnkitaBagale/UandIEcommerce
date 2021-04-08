import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";

import App from "./App";
import { CartContextProvider } from "./context";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </StrictMode>,
  rootElement
);
