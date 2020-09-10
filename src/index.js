
import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import store from "./redux/store";
import dotenv from "dotenv";

import "./index.css";
import App from "./App";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp.component";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={SignInAndSignUp} />
      <Route path="/app" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
