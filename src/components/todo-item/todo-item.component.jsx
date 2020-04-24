import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";

import InputField from "../input-field/input-field.component";

import "./todo-item.styles.scss";

const ToDoItem = ({
  actions,
  details,
  detailsDraft,
  detailsVisible,
  done,
  draft,
  dueDate,
  editMode,
  id,
  owner,
  title,
}) => {
  const date = new Date(dueDate);
  const icons = (
    <>
      <Icon
        id={id}
        type={IconTypes.REMOVE}
        onClick={actions[ActionTypes.REMOVE]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.EDIT}
        onClick={actions[ActionTypes.EDIT]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.DONE}
        onClick={actions[ActionTypes.DONE]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.TOGGLE_DETAILS}
        onClick={actions[ActionTypes.TOGGLE_DETAILS]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
    </>
  );

  return (
    <div className="todo-item">
      <div
        className={`todo-item__side todo-item__side--front todo-item__side--front${
          detailsVisible ? "" : "--visible"
        }`}
      >
        <div className="todo-item__icons">{icons}</div>

        <div
          className={`todo-item__text todo-item__text--${
            done ? "done" : "pending"
          }`}
        >
          <div className="todo-item__front-title">{title}</div>
          <div className="todo-item__front-details">
            <span>
              Due date:{" "}
              {`${date.getDate() + 1}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}
            </span>
            <span>Owner: {owner}</span>
          </div>
        </div>
      </div>

      <div
        className={`todo-item__side todo-item__side--back todo-item__side--back${
          detailsVisible ? "--visible" : ""
        }`}
      >
        <div className="todo-item__icons">{icons}</div>

        <div
          className={`todo-item__text todo-item__text--${
            done ? "done" : "pending"
          }`}
        >
          <div className="todo-item__back-title">{title}</div>
          <div className="todo-item__back-details">{details}</div>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
