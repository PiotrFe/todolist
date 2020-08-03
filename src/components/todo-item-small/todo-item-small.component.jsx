import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./todo-item-small.styles.scss";

const ToDoItemSmall = ({ color, dueDate, id, idx, owner, title }) => {
  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todo-item-small ${snapshot.isDragging ? `todo-item-small--isdragging` : null}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, transparent`,
          }}
        >
          <div
            className="todo-item-small__title"
          >
            {title}
          </div>
          <div className="todo-item-small__duedate">{formattedDate}</div>
          <div className="todo-item-small__owner">{owner}</div>
        </div>
      )}
    </Draggable>
  );
};

export default ToDoItemSmall;
