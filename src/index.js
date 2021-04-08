import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthContextProvider, CartContextProvider } from "./context";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CartContextProvider>
      <Router>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Router>
    </CartContextProvider>
  </StrictMode>,
  rootElement
);
