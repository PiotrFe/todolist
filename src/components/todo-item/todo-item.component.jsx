import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Dropdown, Icon } from "rsuite";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";

import {
  selectTitle,
  selectColor,
  selectDetails,
  selectDone,
  selectDueDate,
  selectListIDs,
  selectOwner,
} from "../../redux/todo-item/todo-item.selectors";

import {
  ActionTypes,
  ToDoFields,
  ColorPickerColors,
} from "../../constants/constants";

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

  const { DONE, SUBMIT, EDIT, REMOVE, UPDATE, CANCEL } = ActionTypes;
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
        return <Icon icon="more" />;
      }}
    >
      <Dropdown.Menu title="Color" pullLeft>
        {Object.values(ColorPickerColors).map((color) => (
          <Dropdown.Item
            key={`${_id}_${color}`}
            style={{ backgroundColor: `${color}` }}
            onSelect={() => handleColorChange(color)}
          ></Dropdown.Item>
        ))}
      </Dropdown.Menu>
      <Dropdown.Item
        icon={<Icon icon="detail" />}
        onSelect={() => toggleDetailsVisible(!detailsVisible)}
      >
        More info
      </Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="check" />} onSelect={handleToDoDone}>
        Done
      </Dropdown.Item>
      <Dropdown.Item
        icon={<Icon icon="edit2" />}
        onSelect={() => toggleEditMode(!editMode)}
      >
        Edit
      </Dropdown.Item>
      <Dropdown.Item
        icon={<Icon icon="trash2" />}
        onSelect={() => actions[REMOVE]({ todoID: _id })}
      >
        Remove
      </Dropdown.Item>
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
              <div className={`todo-item__duedate todo-item__duedate--front`}>
                Due date:{" "}
                <span
                  className={`${
                    sorts[DUE_DATE] !== 0 ? "todo-item__field--sorted" : null
                  }`}
                >
                  {formattedDate}
                </span>
              </div>
              <div className={`todo-item__owner todo-item__owner--front`}>
                Owner:
                <span
                  className={`${
                    sorts[OWNER] !== 0 ? "todo-item__field--sorted" : null
                  }`}
                >
                  {owner}
                </span>
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
          todoID={_id}
          actions={{
            [CANCEL]: () => toggleEditMode(false),
            [SUBMIT]: ({ todo }) => {
              toggleEditMode(false);
              actions[EDIT]({ todo });
            },
          }}
          content={{
            title,
            owner,
            dueDate,
            details,
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
  done: selectDone,
});

export default connect(mapStateToProps)(ToDoItem);
