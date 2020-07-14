import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.styles.scss";

import NavSide from "./components/nav-side/nav-side.component";
import HomePage from "./pages/home/home-page.component";
import TemplatesPage from "./pages/templates/templates-page.component";
import UserPage from "./pages/user/user-page.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp.component";
import ToDoListsContainer from "./components/todo-lists-container/todo-lists-container.component";
import UserLogo from "./components/user-logo/user-logo.component";
import ToDoCockpit from "./components/todo-cockpit/todo-cockpit.component";

import {
  signOutUser,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

require("dotenv").config();

function App() {
  const [currentUser, updateCurrentUser] = useState("");

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          updateCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        updateCurrentUser(null);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <div className="app">
              {currentUser ? (
          <UserLogo
            initials={currentUser.email}
            onClick={() => signOutUser()}
          />
        ) : null}
      <div className="app-split app-split__left-side">
      <ToDoCockpit />
      </div>
      <div className="app-split app-split__right-side">
      <ToDoListsContainer />
      </div>
    </div>
  );
}

export default App;
