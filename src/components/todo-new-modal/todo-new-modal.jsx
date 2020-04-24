import React from "react";

import "./todo-new-modal.scss";

import Overlay from "../../components/overlay/overlay.component";
import { useState } from "react";

import { ActionTypes, Themes } from "../../constants/constants";
import { parseDate } from "../utils/utils";

const ToDoModal = ({ actions, content = null }) => {
  console.log(JSON.stringify(content));
  const today = new Date();
  const MAX_LENGTH = 250;
  const {title: toDoTitle, dueDate: toDoDueDate, owner: toDoOwner, details: toDoDetails} = content;

  const [title, updateTitle] = useState(toDoTitle);
  const [dueDate, updateDueDate] = useState( toDoDueDate ? parseDate(toDoDueDate) : parseDate(new Date()));
  const [owner, updateOwner] = useState(toDoOwner);
  const [details, updateDetails] = useState(toDoDetails);
  const [detailsLength, updateDetailsLength] = useState(toDoDetails ? toDoDetails.length : 0);

  const handleToDo = () => {
    const toDo = {
      title: title,
      details: details,
      draft: "",
      detailsDraft: "",
      owner: owner,
      dueDate: Date.parse(dueDate),
      done: false,
      editMode: false,
      detailsVisible: false,
    };

    content ? actions[ActionTypes.EDIT](toDo) : actions[ActionTypes.SUBMIT](toDo);
    
  };

  const cancelAction = () => {
    actions[ActionTypes.CANCEL]();
  };

  return (
    <>
      <div className="modal">
        <div className="modal__header">Enter to-do details</div>
        <form className="modal__form">
          <div className="modal__form-group modal__form-group--title">
            <label htmlFor="modal-title" className="modal-label">
              Title
            </label>
            <input
              type="text"
              id="modal-title"
              className="modal-input modal-input--title"
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </div>

          <div className="modal__form-group modal__form-group--duedate">
            <label htmlFor="modal-duedate" className="modal-label">
              Due date
            </label>
            <input
              type="date"
              id="modal-duedate"
              className="modal-input modal-input--duedate"
              value={dueDate}
              onChange={(e) => updateDueDate(e.target.value)}
            />
          </div>

          <div className="modal__form-group modal__form-group--owner">
            <label htmlFor="modal-owner" className="modal-label">
              Owner
            </label>
            <input
              type="text"
              id="modal-owner"
              className="modal-input modal-input--owner"
              value={owner}
              onChange={(e) => updateOwner(e.target.value)}
            />
          </div>

          <div className="modal__form-group modal__form-group--details">
            <label htmlFor="modal-details" className="modal-label">
              Details
            </label>
            <textarea
              id="modal-details"
              className="modal-input modal-input--details"
              value={details}
              onChange={(e) => {
                updateDetails(e.target.value);
                updateDetailsLength(e.target.value.length);
              }}
            />
            <span className="modal-input__charcount">{`${detailsLength}/${MAX_LENGTH}`}</span>
          </div>

          <div className="modal__form-group modal__form-group--buttons">
            <button
              className="modal-button modal-button--submit"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleToDo();
     
              }}
            >
              Save
            </button>
            <button
              className="modal-button modal-button--cancel"
              type="button"
              onClick={cancelAction}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ToDoModal;
