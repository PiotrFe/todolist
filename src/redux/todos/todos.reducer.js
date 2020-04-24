import { TodoActionTypes } from "./todos.types";

const INITIAL_STATE = {
    loading: false,
    TodoItems: []
}

const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TodoActionTypes.ADD_TODO: 
            return {
                ...state,
                TodoItems: [...TodoItems, action.payload]
            }
        default: 
            return state;
    }
}