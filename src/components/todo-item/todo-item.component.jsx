import React, { useState } from "react";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";

import Icon from "../icon/icon.component";
import ColorPicker from "../color-picker/color-picker.component";
import ToDoItemEditable from "../../components/todo-item-editable/todo-item-editable.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";
import InputField from "../input-field/input-field.component";

import { toggleDetails } from "../../redux/todo-item/todo-item.actions";
import { removeToDo } from "../../redux/todo-lists-container/todo-lists-container.actions";

import "./todo-item.styles.scss";

const ToDoItem = ({
  actions,
  details,
  done,
  dueDate,
  id,
  listID,
  owner,
  title,
  color,
  removeToDo,
}) => {
  const [colorPickerVisible, toggleColorPicker] = useState(false);
  const [editMode, toggleEditMode] = useState(false);
  const [detailsVisible, toggleDetailsVisible] = useState(false);

  const {
    ADD,
    CHANGE,
    CHANGE_COLOR,
    DONE,
    DRAG,
    EDIT,
    REMOVE,
    SORT,
    SUBMIT,
    UPDATE,
  } = ActionTypes;

  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const icons = (
    <>
      <Icon
        id={id}
        type={IconTypes.COLOR}
        handleClick={() => toggleColorPicker(!colorPickerVisible)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.REMOVE}
        handleClick={() => removeToDo({listID, todoID: id})}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.EDIT}
        handleClick={() => toggleEditMode(!editMode)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.DONE}
        handleClick={actions[DONE]}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        id={id}
        type={IconTypes.TOGGLE_DETAILS}
        handleClick={() => toggleDetailsVisible(!detailsVisible)}
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
            <div
              className="todo-item__title--front"
              style={{
                backgroundImage: `linear-gradient(to right, ${color}, transparent`,
              }}
            >
              {title}
            </div>
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
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          }}
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
      <CSSTransitionGroup
        transitionName="color-picker"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
      >
        {colorPickerVisible ? (
          <ColorPicker
            id={id}
            applyColor={actions[CHANGE_COLOR]}
            showColorPicker={toggleColorPicker}
          />
        ) : null}
      </CSSTransitionGroup>

      {editMode ? (
        <ToDoItemEditable
          color={color}
          details={details}
          detailsVisible={detailsVisible}
          done={done}
          dueDate={dueDate}
          editMode={editMode}
          id={id}
          key={id}
          owner={owner}
          title={title}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeToDo: ({ todoID, listID }) => dispatch(removeToDo({ todoID, listID })),
});

export default connect(null, mapDispatchToProps)(ToDoItem);
