import React, { useState, useEffect, useRef } from "react";

import { CSSTransition } from "react-transition-group";

import "./App.styles.scss";

import ToDoListsContainer from "./components/todo-lists-container/todo-lists-container.component";
import UserLogo from "./components/user-logo/user-logo.component";
import ToDoCockpit from "./components/todo-cockpit/todo-cockpit.component";
import FilterBar from "./components/filter-bar/filter-bar.component";

import { MAIN_INPUT_ID } from "./constants/constants"

import "rsuite/dist/styles/rsuite-default.css";

import {
  signOutUser,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

require("dotenv").config();

function App() {
  const [currentUser, updateCurrentUser] = useState("");
  const [cockpitVisible, toggleCockpit] = useState(true);
  const [inputContent, updateInputContent] = useState("");

  const inputRef = useRef(null);

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

  return (<>
    <div className="app" id="app">
      {currentUser ? (
        <UserLogo initials={currentUser.email} onClick={() => signOutUser()} />
      ) : null}
      <div
        className={`app-split app-split__left-side ${
          !cockpitVisible ? "app-split__left-side--hidden" : null
        }`}
      >
        <ToDoCockpit
          visible={cockpitVisible}
          toggle={() => toggleCockpit(!cockpitVisible)}
        />
      </div>
      <div className="app-split app-split__right-side">
        <>
        <FilterBar
          listID={MAIN_INPUT_ID}
          inCockpit={false}
          placeholder={"Type to search in all lists"}
        />
        <ToDoListsContainer />
        </>
      </div>
    </div>
    <div className="modal-root" id="modal-root"></div>
    </>
  );
}

export default App;
