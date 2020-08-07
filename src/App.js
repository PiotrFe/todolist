import React, { useState, useEffect, useRef } from "react";

import Drawer from "./components/drawer/drawer.component";
import NavSide from "./components/nav-side/nav-side.component";
import ToDoListsContainer from "./components/todo-lists-container/todo-lists-container.component";
import UserLogo from "./components/user-logo/user-logo.component";
import ToDoCockpit from "./components/todo-cockpit/todo-cockpit.component";
import FilterBar from "./components/filter-bar/filter-bar.component";
import Input from "./components/todo-input/todo-input.component";

import { MAIN_INPUT_ID } from "./constants/constants";

import "rsuite/dist/styles/rsuite-default.css";
import "./App.styles.scss";

import {
  signOutUser,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";
import { addList } from "./redux/todo-lists-container/todo-lists-container.actions";

require("dotenv").config();

function App() {
  const [currentUser, updateCurrentUser] = useState("");
  const [cockpitVisible, toggleCockpit] = useState(false);
  const [addListMode, toggleAddListMode] = useState(false);

  const mainInputRef = useRef(null);

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
    <>
      <div className="app" id="app">
        {currentUser ? (
          <UserLogo
            initials={currentUser.email}
            onClick={() => signOutUser()}
          />
        ) : null}
          <Drawer title="Cockpit" show={cockpitVisible} toggleCockpit={() => toggleCockpit(!cockpitVisible)} >
            <ToDoCockpit
            />
          </Drawer>
          <NavSide 
            toggleCockpit={() => toggleCockpit(!cockpitVisible)}
            addList={() => toggleAddListMode(!addListMode)}
            />
        <div className="app-main">
          <>
            <FilterBar
              listID={MAIN_INPUT_ID}
              inCockpit={false}
              placeholder={"Type to search in all lists"}
            />
            {addListMode && <Input placeholder="Please provide list title" />}
            <ToDoListsContainer />
          </>
        </div>
      </div>
      <div className="modal-root" id="modal-root"></div>
    </>
  );

  // return <Dnd />
}

export default App;
