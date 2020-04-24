import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.styles.scss";

// import Header from "./components/header/header.component";
import NavSide from "./components/nav-side/nav-side.component";
import HomePage from "./pages/home/home-page.component";
import TemplatesPage from "./pages/templates/templates-page.component";
import UserPage from "./pages/user/user-page.component";

function App() {
  return (
    <div className="app">
      <div className="app__nav-side">
        <NavSide />
      </div>
      <div className="app__content">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/user" component={UserPage} />
          <Route path="/templates" component={TemplatesPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
