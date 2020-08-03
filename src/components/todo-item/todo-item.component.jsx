import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import ColorPicker from "../color-picker/color-picker.component";
import { ActionTypes, ToDoFields } from "../../constants/constants";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import { Dropdown } from "rsuite";

import "./todo-item.styles.scss";

const ToDoItem = ({
  actions,
  color,
  details,
  done,
  dueDate,
  id,
  listID,
  owner,
  sorts,
  title,
}) => {
  const [colorPickerVisible, toggleColorPicker] = useState(false);
  const [editMode, toggleEditMode] = useState(false);
  const [detailsVisible, toggleDetailsVisible] = useState(false);

  const { DONE, EDIT, REMOVE, UPDATE } = ActionTypes;
  const { TITLE, DUE_DATE, OWNER, COLOR } = ToDoFields;

  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const handleToDoDone = () => {
    actions[UPDATE]({ todoID: id, field: "done", value: !done });
  };

  const handleToDoChangeColor = ({ color }) => {
    actions[UPDATE]({ todoID: id, field: "color", value: color });
  };

  const dropDown = (
    <Dropdown title="..." trigger="hover" placement="bottomEnd" noCaret>
      <Dropdown.Item onSelect={() => toggleDetailsVisible(!detailsVisible)}>
        More info
      </Dropdown.Item>
      <Dropdown.Item onSelect={handleToDoDone}>Done</Dropdown.Item>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item onSelect={() => actions[REMOVE]({ listID, todoID: id })}>
        Remove
      </Dropdown.Item>
      <Dropdown.Item>Color</Dropdown.Item>
    </Dropdown>
  );

  return (
    <div className="todo-container">
      <div className="todo-item">
        <div
          className={`todo-item__side todo-item__side--front ${
            detailsVisible ? "" : "todo-item__side--front--visible"
          }`}
        >
          <div
            className={`todo-item__content todo-item__content--${
              done ? "done" : "pending"
            }`}
          >
            <div className="todo-item__header">
              <div
                className={`todo-item__title todo-item__title--front ${sorts[TITLE] !== 0 ? "todo-item__field--sorted" : null}`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${color}, transparent`,
                }}
              >
                {title}
              </div>
              <div className="todo-item__icons">{dropDown}</div>
            </div>

            <div className="todo-item__details todo-item__details--front">
              <div className={`todo-item__duedate todo-item__duedate--front ${sorts[DUE_DATE] !== 0 ? "todo-item__field--sorted" : null}`}>
                Due date: <span>{formattedDate}</span>
              </div>
              <div className={`todo-item__owner todo-item__owner--front ${sorts[OWNER] !== 0 ? "todo-item__field--sorted" : null}`}>
                Owner:
                <span>{owner}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`todo-item__side todo-item__side--back ${
            detailsVisible ? "todo-item__side--back--visible" : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          }}
        >
          <div className="todo-item__icons todo-item__icons--back">
            {dropDown}
          </div>

          <div className={`todo-item__title todo-item__title--back ${sorts[TITLE] !== 0 ? "todo-item__field--sorted" : null}` }>{title}</div>
          <div className="todo-item__more">{details}</div>

          <div className={`todo-item__duedate todo-item__duedate--back ${sorts[DUE_DATE] !== 0 ? "todo-item__field--sorted" : null}`}>
            <span>{formattedDate}</span>
          </div>
          <div className={`todo-item__owner todo-item__owner--back ${sorts[OWNER] !== 0 ? "todo-item__field--sorted" : null}`}>
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
            applyColor={handleToDoChangeColor}
            showColorPicker={toggleColorPicker}
          />
        ) : null}
      </CSSTransitionGroup>

      {editMode && (
        <ToDoModal
          id={id}
          actions={{
            [ActionTypes.CANCEL]: toggleEditMode,
            [ActionTypes.EDIT]: actions[UPDATE],
            [ActionTypes.SUBMIT]: ({ listID: id, todo }) => {
              toggleEditMode(!editMode);
            },
          }}
        />
      )}
    </div>
  );
};

export default ToDoItem;
