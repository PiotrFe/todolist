import React, { useState, useRef } from "react";
import { connect } from "react-redux";


import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";
import TodoInput from "../todo-input/todo-input.component";
import NavTop from "../nav-top/nav-top.component";
import Overlay from "../overlay/overlay.component";
import NavSide from "../nav-side/nav-side.component";
import { ActionTypes } from "../../constants/constants";
import {DEFAULT_SORTS} from "../../constants/constants";

import {
  addList
} from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-cockpit.styles.scss";

const ToDoCockpit = ({addList, visible, toggle}) => {
  const [inputContent, updateInputContent] = useState("");
  const [editMode, toggleEditMode] = useState(false);
  const [dragMode, toggleDragMode] = useState(false);
  const inputRef = useRef(null);

  const listID = "Cockpit";

  const addToDoList = () => {
    addList(inputContent);
    updateInputContent("");
    toggleEditMode(!editMode);
  };

  const updateSorts = () => {
    // Update sorts
  };

  return (
    <div className={`todo-cockpit`}>
      {editMode && (
        <>
          <Overlay
            show={true}
            onClick={() => toggleEditMode(!editMode)}
            opaque={true}
          />
          <div className="add-list-input">
            <TodoInput
              ref={inputRef}
              content={inputContent}
              onSubmit={addToDoList}
              onChange={updateInputContent}
              placeholder={"Enter list title"}
            />
          </div>
        </>
      )}
     
      <ToDoItemsContainer
        listID={listID}
        inCockpit={true}
        title={listID}
        onChange={updateInputContent}
        onSubmit={addToDoList}
      >
        <NavTop
          listID={listID}
          actions={{
            [ActionTypes.DRAG]: () => toggleDragMode(!dragMode),
            [ActionTypes.EDIT]: () => toggleEditMode(!editMode),
            [ActionTypes.SORT]: updateSorts,
          }}
          sorts={DEFAULT_SORTS}
          dragModeOn={dragMode}
        />
      </ToDoItemsContainer>
      <NavSide toggle={toggle} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addList: (title) => dispatch(addList(title))
})

export default connect(null, mapDispatchToProps)(ToDoCockpit);
