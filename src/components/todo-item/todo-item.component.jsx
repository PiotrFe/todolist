import React, { useState } from "react";

import Icon from "../icon/icon.component";
import ColorPicker from "../color-picker/color-picker.component";
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

  const [colorPickerVisible, toggleColorPicker] = useState(true);

  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const icons = (
    <>
      <Icon
        id={id}
        type={IconTypes.COLOR}
        onClick={() => toggleColorPicker(!colorPickerVisible)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
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
    <div className="todo-container">
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
            <div className="todo-item__title--front">{title}</div>
            <div className="todo-item__details--front">
              <div className="todo-item__duedate todo-item__duedate--front">
                Due date: <span>{formattedDate}</span>
              </div>
              <div className="todo-item__owner todo-item__owner--front">
                Owner:
                <span>{owner}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`todo-item__side todo-item__side--back todo-item__side--back${
            detailsVisible ? "--visible" : ""
          }`}
        >
          <div className="todo-item__icons todo-item__icons--back">{icons}</div>

          <div className="todo-item__title todo-item__title--back">{title}</div>
          <div className="todo-item__details todo-item__details--back">
            {details}
          </div>
          <div className="todo-item__duedate todo-item__duedate--back">
            <span>{formattedDate}</span>
          </div>
          <div className="todo-item__owner todo-item__owner--back">
            <span>{owner}</span>
          </div>
        </div>
      </div>
      {colorPickerVisible ? <ColorPicker /> : null}
        

    </div>
  );
};

export default ToDoItem;
