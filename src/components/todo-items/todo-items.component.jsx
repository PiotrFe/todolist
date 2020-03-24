import React from "react";

import ToDoItem from "../../components/todo-item/todo-item.component";

import "./todo-items.styles.scss";

const ToDoItems = props => (
  <div className="todo-items">
    <h1>To do items go here</h1>
    <div className="todo-items__list">
      {props.items.map(({_id, title, details, draft, detailsDraft, done, editMode, detailsVisible } ) => (
        <ToDoItem
        actions={props.actions}
        details={details}
        detailsDraft={detailsDraft}
        detailsVisible={detailsVisible}
        done={done}
        draft={draft}
        editMode={editMode}
        id={_id}
        key={_id}
        title={title}
        />
      ))}
    </div>
  </div>
);

export default ToDoItems;
