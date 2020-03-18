import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";
import { Sizes, Components } from "../../constants/constants";

import InputField from "../input-field/input-field.component";

import "./todo-item.styles.scss";

const ToDoItem = ({done, text, idx, actions, draft, editMode}) => (
    <div className="todo-item">
        <div className={`todo-item__text todo-item__text--${done ? "done" : "pending"}`}>
            {text}
        </div>
        <Icon idx={idx} type={IconTypes.REMOVE} onClick={actions.remove} parent={Components.TODO_ITEM} size={Sizes.LARGE} />
        <Icon idx={idx} type={IconTypes.EDIT} onClick={actions.edit} parent={Components.TODO_ITEM} size={Sizes.LARGE} />
        <Icon idx={idx} type={IconTypes.DONE} onClick={actions.done} parent={Components.TODO_ITEM} size={Sizes.LARGE}  />
        {editMode 
        ? <InputField idx={idx} value={draft} actions={actions} size={Sizes.SMALL} />
        : null }
        
    </div>

)

export default ToDoItem;