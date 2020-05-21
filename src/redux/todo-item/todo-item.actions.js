import {ToDoActionTypes} from "./todo-item.types";

const {TOGGLE_DETAILS} = ToDoActionTypes;

export const toggleDetails = () => ({type: TOGGLE_DETAILS});