import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthenticationProvider, StateProvider } from "./context";
import ScrollToTop from "./ScrollToTop";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StateProvider>
      <Router>
        <AuthenticationProvider>
          <ScrollToTop />
          <App />
        </AuthenticationProvider>
      </Router>
    </StateProvider>
  </StrictMode>,
  rootElement
);
