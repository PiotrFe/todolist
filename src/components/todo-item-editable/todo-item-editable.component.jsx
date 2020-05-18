import React, {useState} from "react";

import "./todo-item-editable.styles.scss";

import {parseDate} from "../../components/utils/utils";

const ToDoItemEditable = ({
        actions,
        details: passedDetails,
        detailsDraft,
        done,
        draft,
        dueDate: passedDueDate,
        editMode,
        id,
        owner: passedOwner,
        title: passedTitle,
        color
      }
) => {
    const [title, updateTitle] = useState(passedTitle);
    const [dueDate, updateDueDate] = useState( passedDueDate ? passedDueDate : new Date());
    const [owner, updateOwner] = useState(passedOwner);
    const [details, updateDetails] = useState(passedDetails);
    const [detailsLength, updateDetailsLength] = useState(details.length);

    const MAX_LENGTH = 250;

    const handleToDo = () => {
        console.log("Click!");
    }

    return (

        <div className="todo-editable">
        <form className="todo-form">
          <div className="todo-form__group todo-form__group--title">
            <label htmlFor="todo-form__title" className="todo-form__label">
              Title
            </label>
            <input
              type="text"
              id="todo-form__title"
              className="todo-form__input"
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </div>

          <div className="todo-form__group todo-form__group--duedate">
            <label htmlFor="todo-form__duedate" className="todo-form__label">
              Due date
            </label>
            <input
              type="date"
              id="todo-form__duedate"
              className="todo-form__input"
              value={parseDate(dueDate)}
              onChange={(e) => updateDueDate(e.target.value)}
            />
          </div>

          <div className="todo-form__group todo-form__group--owner">
            <label htmlFor="todo-form__owner" className="todo-form__label">
              Owner
            </label>
            <input
              type="text"
              id="todo-form__owner"
              className="todo-form__input"
              value={owner}
              onChange={(e) => updateOwner(e.target.value)}
            />
          </div>

          <div className="todo-form__group todo-form__group--details">
            <label htmlFor="todo-form__details" className="todo-form__label">
              Details
            </label>
            <textarea
              id="todo-form__details"
              className="todo-form__details"
              value={details}
              onChange={(e) => {
                updateDetails(e.target.value);
                updateDetailsLength(e.target.value.length);
              }}
            />
            <span className="todo-form__charcount">{`${detailsLength}/${MAX_LENGTH}`}</span>
          </div>

          <div className="todo-form__group todo-form__group--buttons">
            <button
              className="todo-form__button todo-form__button--submit"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleToDo();
              }}
            >
              Save
            </button>
            <button
              className="todo-form__button todo-form__button--cancel"
              type="button"
              onClick={null}
            >
              Cancel
            </button>
          </div>
        </form>


        </div>
    )

}

export default ToDoItemEditable