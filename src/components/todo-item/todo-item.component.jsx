import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";

import InputField from "../input-field/input-field.component";

import "./todo-item.styles.scss";

const ToDoItem = ({ done, title, details, idx, actions, draft, editMode, detailsVisible }) => (
  <div className="todo-item">
    <div className={`todo-item__side todo-item__side--front todo-item__side--front${detailsVisible ? "" : "--visible" }`}>

      <div className="todo-item__icons">
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
      </div>
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
          actions={actions}
          size={Sizes.SMALL}
        />
      ) : null}
    </div>
    <div className={`todo-item__side todo-item__side--back todo-item__side--back${detailsVisible ? "--visible" : "" }`}>
      <div
        className={`todo-item__text todo-item__text--${
          done ? "done" : "pending"
        }`}
      >
        {title}
      </div>
      <div className="todo-item__details">
          {details}
      </div>
      <div className="todo-item__icons">
        <Icon
          idx={idx}
          type={IconTypes.HOME}
          onClick={actions[ActionTypes.EDIT]}
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
      </div>
    </div>
  </div>
);

export default ToDoItem;
