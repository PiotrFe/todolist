import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";
import App from "./App";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
