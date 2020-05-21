import {ToDoActionTypes} from "./todo-item.types";

const {TOGGLE_DETAILS} = ToDoActionTypes;

const INITIAL_STATE = {
    detailsVisible: false
}

const todoItemReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TOGGLE_DETAILS:
            return {
                ...state,
                detailsVisible: !state.detailsVisible
            }
        default:
            return state;
    }
}

export default todoItemReducer;