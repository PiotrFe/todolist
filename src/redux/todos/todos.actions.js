import { TodoActionTypes } from "./todos.types";

export const addTodo = item => {
    return { type: TodoActionTypes.ADD_TODO, payload: item }
};