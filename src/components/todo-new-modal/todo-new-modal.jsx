import React, { useState } from "react";

import Overlay from "../overlay/overlay.component";

import { ActionTypes } from "../../constants/constants";
import { parseDate } from "../utils/utils";

import "./todo-new-modal.scss";

const ToDoModal = ({ listID, actions, todoID = null, content = null }) => {
  const today = new Date();
  const MAX_LENGTH = 250;

  const [title, updateTitle] = useState(content?.title || "");
  const [dueDate, updateDueDate] = useState(content?.dueDate || new Date());
  const [owner, updateOwner] = useState(content?.owner || "");
  const [details, updateDetails] = useState(content?.details || "");
  const [detailsLength, updateDetailsLength] = useState(0);

  const handleToDo = () => {
    let todo = {
      title,
      details,
      draft: "",
      detailsDraft: "",
      owner,
      dueDate,
      done: false,
      editMode: false,
      detailsVisible: false,
      color: "",
    };

    if (todoID) todo = {
      ...todo,
      _id: todoID
    }

    actions[ActionTypes.SUBMIT]({ todo });
  };

  const cancelAction = () => {
    actions[ActionTypes.CANCEL]();
  };

  return (
    <Overlay show={true} opaque={true}>
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
              value={parseDate(dueDate)}
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
    </Overlay>
  );
};

export default ToDoModal;
