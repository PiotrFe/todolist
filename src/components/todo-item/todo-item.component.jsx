import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import Icon from "../icon/icon.component";
import ColorPicker from "../color-picker/color-picker.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components, ActionTypes } from "../../constants/constants";
import Overlay from "../../components/overlay/overlay.component";
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
  title,
}) => {
  const [colorPickerVisible, toggleColorPicker] = useState(false);
  const [editMode, toggleEditMode] = useState(false);
  const [detailsVisible, toggleDetailsVisible] = useState(false);

  const { DONE, EDIT, REMOVE, UPDATE } = ActionTypes;

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

  const icons = (
    <>
      {/* <Icon
        type={IconTypes.COLOR}
        onClick={() => toggleColorPicker(!colorPickerVisible)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        type={IconTypes.REMOVE}
        onClick={() => actions[REMOVE]({ listID, todoID: id })}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        type={IconTypes.EDIT}
        onClick={() => toggleEditMode(!editMode)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        type={IconTypes.DONE}
        onClick={handleToDoDone}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      />
      <Icon
        type={IconTypes.TOGGLE_DETAILS}
        onClick={() => toggleDetailsVisible(!detailsVisible)}
        parent={Components.TODO_ITEM}
        size={Sizes.SMALL}
      /> */}
    </>
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
                className="todo-item__title todo-item__title--front"
                style={{
                  backgroundImage: `linear-gradient(to right, ${color}, transparent`,
                }}
              >
                {title}
              </div>
              <div className="todo-item__icons">
                {icons}

                <Dropdown title="..." trigger="hover" noCaret>
                  <Dropdown.Item
                    onSelect={() => toggleDetailsVisible(!detailsVisible)}
                  >
                    More info
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={handleToDoDone}>Done</Dropdown.Item>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item
                    onSelect={() => actions[REMOVE]({ listID, todoID: id })}
                  >
                    Remove
                  </Dropdown.Item>
                  <Dropdown.Item>Color</Dropdown.Item>
                </Dropdown>
              </div>
            </div>

            <div className="todo-item__details todo-item__details--front">
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
          className={`todo-item__side todo-item__side--back ${
            detailsVisible ? "todo-item__side--back--visible" : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          }}
        >
          <div className="todo-item__icons todo-item__icons--back">{icons}</div>

          <div className="todo-item__title todo-item__title--back">{title}</div>
          <div className="todo-item__more">{details}</div>

          <div className="todo-item__duedate todo-item__duedate--back">
            <span>{formattedDate}</span>
          </div>
          <div className="todo-item__owner todo-item__owner--back"><span>{owner}</span></div>
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

      {editMode ? (
        <>
          <Overlay show={true} onClick={null} opaque={true} />
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
        </>
      ) : null}
    </div>
  );
};

export default ToDoItem;
