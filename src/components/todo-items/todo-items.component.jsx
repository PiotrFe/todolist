import React from "react";

import ToDoItem from "../../components/todo-item/todo-item.component";

import "./todo-items.styles.scss";

const ToDoItems = props => (
  <div className="todo-items">
    <h1>To do items go here</h1>
    <div className="todo-items__list">
      {props.items.map(({ title, details, draft, detailsDraft, done, editMode, detailsVisible }, idx) => (
        <ToDoItem
          key={idx}
          idx={idx}
          title={title}
          details={details}
          draft={draft}
          detailsDraft={detailsDraft}
          done={done}
          editMode={editMode}
          detailsVisible={detailsVisible}
          actions={props.actions}
        />
      ))}
    </div>
  </div>
);

export default ToDoItems;
