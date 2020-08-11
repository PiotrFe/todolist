import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Dropdown, Icon, IconButton } from "rsuite";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import { selectTitle, selectColor, selectDetails, selectDone, selectDueDate, selectListIDs, selectOwner } from "../../redux/todo-item/todo-item.selectors";

import { ActionTypes, ToDoFields, ColorPickerColors } from "../../constants/constants";

import "./todo-item.styles.scss";


const ToDoItem = ({
  _id,
  actions,
  color,
  details,
  done,
  dueDate,
  owner,
  sorts,
  title,
}) => {
  const [editMode, toggleEditMode] = useState(false);
  const [detailsVisible, toggleDetailsVisible] = useState(false);

  const { DONE, EDIT, REMOVE, UPDATE } = ActionTypes;
  const { TITLE, DUE_DATE, OWNER, COLOR } = ToDoFields;

  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const handleToDoDone = () => {
    actions[UPDATE]({ todoID: _id, field: "done", value: !done });
  };

  const handleColorChange = (color) => {
    actions[UPDATE]({ todoID: _id, field: "color", value: color });
  };

  const dropDown = (
    <Dropdown
      placement="leftStart"
      renderTitle={() => {
        return (
          <IconButton appearance="primary" icon={<Icon icon="more" />} circle />
        );
      }}
    >
      <Dropdown.Item onSelect={() => toggleDetailsVisible(!detailsVisible)}>
        More info
      </Dropdown.Item>
      <Dropdown.Item onSelect={handleToDoDone}>Done</Dropdown.Item>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item onSelect={() => actions[REMOVE]({ todoID: _id })}>
        Remove
      </Dropdown.Item>
      <Dropdown.Menu title="Color" pullLeft>
        {Object.values(ColorPickerColors).map((color) => (
          <Dropdown.Item
            key={`${_id}_${color}`}
            style={{ "backgroundColor": `${color}` }}
            onSelect={() => handleColorChange(color)}
          ></Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="todo-container">
      <div className="todo-item__icons">{dropDown}</div>

      <div className="todo-item">
        <div
          className={`todo-item__side todo-item__side--front ${
            detailsVisible ? "" : "todo-item__side--front--visible"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, transparent`,
          }}
        >
          <div
            className={`todo-item__content todo-item__content--${
              done ? "done" : "pending"
            }`}
          >
            <div className="todo-item__header">
              <div
                className={`todo-item__title todo-item__title--front ${
                  sorts[TITLE] !== 0 ? "todo-item__field--sorted" : null
                }`}
              >
                {title}
              </div>
            </div>

            <div className="todo-item__details todo-item__details--front">
              <div
                className={`todo-item__duedate todo-item__duedate--front ${
                  sorts[DUE_DATE] !== 0 ? "todo-item__field--sorted" : null
                }`}
              >
                Due date: <span>{formattedDate}</span>
              </div>
              <div
                className={`todo-item__owner todo-item__owner--front ${
                  sorts[OWNER] !== 0 ? "todo-item__field--sorted" : null
                }`}
              >
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
            backgroundImage: `linear-gradient(to right, ${color}, transparent`,
          }}
        >
          <div
            className={`todo-item__title todo-item__title--back ${
              sorts[TITLE] !== 0 ? "todo-item__field--sorted" : null
            }`}
          >
            {title}
          </div>
          <div className="todo-item__more">{details}</div>

          <div
            className={`todo-item__duedate todo-item__duedate--back ${
              sorts[DUE_DATE] !== 0 ? "todo-item__field--sorted" : null
            }`}
          >
            <span>{formattedDate}</span>
          </div>
          <div
            className={`todo-item__owner todo-item__owner--back ${
              sorts[OWNER] !== 0 ? "todo-item__field--sorted" : null
            }`}
          >
            <span>{owner}</span>
          </div>
        </div>
      </div>
      {editMode && (
        <ToDoModal
          id={_id}
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

const mapStateToProps = createStructuredSelector({
  title: selectTitle,
  owner: selectOwner,
  dueDate: selectDueDate,
  color: selectColor,
  details: selectDetails,
  done: selectDone
})

export default connect(mapStateToProps)(ToDoItem);
