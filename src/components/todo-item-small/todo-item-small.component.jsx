import React from "react";
import "./todo-item-small.styles.scss";

const ToDoItemSmall = ({ color, dueDate, id, owner, title }) => {
  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return (
    <div className="todo-item-small">
      <div className="todo-item-small__title" style={{backgroundColor: color}}>{title}</div>
      <div className="todo-item-small__duedate">{formattedDate}</div>
      <div className="todo-item-small__owner">{owner}</div>
    </div>
  );
};

export default ToDoItemSmall;
