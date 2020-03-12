import React from "react";

import Icon from "../icon/icon.component";
import { IconTypes } from "../icon/icon.types";

import InputField from "../input-field/input-field.component";

import "./todo-item.styles.scss";

const ToDoItem = (props) => (
    <div className="todo-item">
        <div className={`todo-item__text todo-item__text--${props.done ? "done" : "pending"}`}>
            {props.text}
        </div>
        <Icon idx={props.idx} type={IconTypes.remove} onClick={props.actions.remove} />
        <Icon idx={props.idx} type={IconTypes.edit} onClick={props.actions.edit} />
        <Icon idx={props.idx} type={IconTypes.done} onClick={props.actions.done} />
        {props.editMode 
        ? <InputField idx={props.idx} value={props.draft} actions={props.actions} />
        : null }
        
    </div>

)

export default ToDoItem;