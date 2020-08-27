import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Draggable } from "react-beautiful-dnd";

import {
  selectTitle,
  selectColor,
  selectDetails,
  selectDone,
  selectDueDate,
  selectListIDs,
  selectOwner,
} from "../../redux/todo-item/todo-item.selectors";

import "./todo-item-small.styles.scss";

const ToDoItemSmall = ({ color, dueDate, _id, idx, owner, title }) => {
  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return (
    <Draggable draggableId={_id} index={idx}>
      {(provided, snapshot) => (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
          className={`todo-item-small ${snapshot.isDragging ? `todo-item-small--isdragging` : null}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, transparent`,
            ...provided.draggableProps.style,
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

const mapStateToProps = createStructuredSelector({
  title: selectTitle,
  owner: selectOwner,
  dueDate: selectDueDate,
  color: selectColor,
  details: selectDetails,
  done: selectDone,
});

export default connect(mapStateToProps)(ToDoItemSmall);

