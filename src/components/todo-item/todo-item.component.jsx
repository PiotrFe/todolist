import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";

import InputField from "../input-field/input-field.component";

import "./todo-item.styles.scss";

const ToDoItem = ({
  done,
  title,
  details,
  idx,
  actions,
  draft,
  detailsDraft,
  editMode,
  detailsVisible
}) => {
  const icons = (
    <>
      <Icon
        idx={idx}
        type={IconTypes.REMOVE}
        onClick={actions[ActionTypes.REMOVE]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        idx={idx}
        type={IconTypes.EDIT}
        onClick={actions[ActionTypes.EDIT]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        idx={idx}
        type={IconTypes.DONE}
        onClick={actions[ActionTypes.DONE]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        idx={idx}
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
        <div className="todo-item__text-group">
          <div
            className={`todo-item__text todo-item__text--${
              done ? "done" : "pending"
            }`}
          >
            {title}
          </div>
          {editMode ? (
            <InputField
              idx={idx}
              value={draft}
              parent="title"
              actions={actions}
              size={Sizes.SMALL}
            />
          ) : null}
        </div>
      </div>
      <div
        className={`todo-item__side todo-item__side--back todo-item__side--back${
          detailsVisible ? "--visible" : ""
        }`}
      >
        <div
          className={`todo-item__text todo-item__text--${
            done ? "done" : "pending"
          }`}
        >
          {title}
        </div>
        <div className="todo-item__icons">{icons}</div>
        <div className="todo-item__text-group">
          <div className="todo-item__details">{details}</div>
          {editMode ? (
            <InputField
              idx={idx}
              value={detailsDraft}
              parent="details"
              actions={actions}
              size={Sizes.SMALL}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
