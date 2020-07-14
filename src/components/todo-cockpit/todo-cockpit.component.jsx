import React, { useState, useRef } from "react";

import ToDoItemsContainer from "../todo-items-container/todo-items-container.component";
import TodoInput from "../todo-input/todo-input.component";
import NavTop from "../nav-top/nav-top.component";
import { ActionTypes } from "../../constants/constants";

import "./todo-cockpit.styles.scss";

const ToDoCockpit = () => {
  const [inputContent, updateInputContent] = useState("");
  const [editMode, toggleEditMode] = useState(false);
  const [dragMode, toggleDragMode] = useState(false);
  const inputRef = useRef(null);

  const listID = "Cockpit";

  const addToDoList = () => {
    // Add to do list
    console.log(inputContent);
  };

  const updateSorts = () => {
    // Update sorts
  };

  return (
    <div className="todo-cockpit">
      {editMode && <TodoInput ref={inputRef} content={inputContent} onSubmit={addToDoList} onChange={updateInputContent} />}

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
          dragModeOn={dragMode}
        />
      </ToDoItemsContainer>
    </div>
  );
};

export default ToDoCockpit;
