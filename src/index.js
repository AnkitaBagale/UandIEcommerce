import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthenticationProvider, StateProvider } from "./context";

// setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StateProvider>
      <Router>
        <AuthenticationProvider>
          <App />
        </AuthenticationProvider>
      </Router>
    </StateProvider>
  </StrictMode>,
  rootElement
);
