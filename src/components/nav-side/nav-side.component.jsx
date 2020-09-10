import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Sidenav, Nav, Icon } from "rsuite";
import TodoInput from "../todo-input/todo-input.component";
import Overlay from "../../components/overlay/overlay.component";

import { selectAddListMode } from "../../redux/todo-lists-container/todo-lists-container.selectors";
import {
  toggleAddListMode,
  addList,
} from "../../redux/todo-lists-container/todo-lists-container.actions";
import { signOutStart } from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.actions";
import nav from "../../nav";

import "./nav-side.styles.scss";

const NavSide = ({
  toggleCockpit,
  toggleAddListMode,
  toggleReports,
  addListMode,
  addList,
  signOut
}) => {
  const [newListName, updateNewListName] = useState("");

  const inputEl = useRef(null);

  const handleAddList = () => {
    toggleAddListMode();
    updateNewListName("");
    addList(newListName);
  };

  useEffect(() => {
    if (addListMode) inputEl.current.focus();
  }, [addListMode]);

  return (
    <>
      {addListMode && (
        <Overlay onClick={toggleAddListMode}>
          <TodoInput
            content={newListName}
            onChange={(val) => updateNewListName(val)}
            placeholder="Enter list name"
            ref={inputEl}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddList}
          />
        </Overlay>
      )}
      <div className="side-nav-wrapper">
        <Sidenav
          expanded={false}
          defaultOpenKeys={["3", "4"]}
          activeKey={null}
          onSelect={null}
        >
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                eventKey="1"
                onClick={toggleCockpit}
                icon={<Icon icon="dashboard" />}
              >
                Cockpit
              </Nav.Item>
              <Nav.Item
                eventKey="2"
                onClick={toggleAddListMode}
                icon={<Icon icon="plus" />}
              >
                New List
              </Nav.Item>
              <Nav.Item
                eventKey="3"
                onClick={toggleReports}
                icon={<Icon icon="bar-chart" />}
              >
                Reports
              </Nav.Item>
              <Nav.Item
                eventKey="4"
                onClick={() => signOut(() => nav("/"))}
                icon={<Icon icon="exit" />}
              >
                Log out
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  addListMode: selectAddListMode,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddListMode: () => dispatch(toggleAddListMode()),
  addList: (listTitle) => dispatch(addList(listTitle)),
  signOut: (callback) => dispatch(signOutStart(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSide);
