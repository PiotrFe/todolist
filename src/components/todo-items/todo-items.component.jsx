import React from "react";

import ToDoItem from "../../components/todo-item/todo-item.component";

import "./todo-items.styles.scss";

const ToDoItems = props => (
  <div className="todo-items">
    <h1>To do items go here</h1>
    <div className="todo-items__list">
      {props.items.map(({ text, draft, done, editMode }, idx) => (
        <ToDoItem
          key={idx}
          idx={idx}
          text={text}
          draft={draft}
          done={done}
          editMode={editMode}
          actions={props.actions}
        />
      ))}
    </div>
  </div>
);

export default ToDoItems;
