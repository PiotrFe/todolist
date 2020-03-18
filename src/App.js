import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/home/home-page.component";
import TemplatesPage from "./pages/templates/templates-page.component";
import UserPage from "./pages/user/user-page.component";

import Aux from "./components/hoc/auxiliary.component";

function App() {
  return (
    <Aux>
      <Header />
      <Switch>
        <Route path="/user" component={UserPage} />
        <Route path="/templates" component={TemplatesPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Aux>
  );
}

export default App;
