import React, { useState, useEffect, useRef } from "react";

import Drawer from "./components/drawer/drawer.component";
import NavSide from "./components/nav-side/nav-side.component";
import ToDoListsContainer from "./components/todo-lists-container/todo-lists-container.component";
import UserLogo from "./components/user-logo/user-logo.component";
import ToDoCockpit from "./components/todo-cockpit/todo-cockpit.component";
import FilterBar from "./components/filter-bar/filter-bar.component";
import ReportSection from "./components/report/report.component";

import { MAIN_INPUT_ID } from "./constants/constants";

import "rsuite/lib/styles/index.less";
import "./App.styles.scss";

import {
  signOutUser,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

require("dotenv").config();

function App() {
  const [currentUser, updateCurrentUser] = useState("");
  const [cockpitVisible, toggleCockpit] = useState(false);
  const [reportsVisible, toggleReports] = useState(false);
  const [drawerCompoment, updateDrawerComponent] = useState(null);

  useEffect(() => {
    let drawer;

    if (cockpitVisible) {
      drawer = (
        <Drawer
          title="Cockpit"
          show={cockpitVisible}
          onHide={() => toggleCockpit(!cockpitVisible)}
        >
          <ToDoCockpit />
        </Drawer>
      );
    } else if (reportsVisible) {
      drawer = (
        <Drawer
          title="Reports"
          show={reportsVisible}
          onHide={() => toggleReports(!reportsVisible)}
        >
          <ReportSection />
        </Drawer>
      );
    } else drawer = null;

    updateDrawerComponent(drawer);
  }, [cockpitVisible, reportsVisible]);

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
        {drawerCompoment}
        <div className="nav-side">
          <NavSide
            toggleCockpit={() => toggleCockpit(!cockpitVisible)}
            toggleReports={() => toggleReports(!reportsVisible)}
          />
        </div>
        <div className="app-main">
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
