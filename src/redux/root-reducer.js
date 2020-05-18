import { combineReducers } from "redux";

import todoItemsReducer from "./todo-items/todo-items.reducer";

export default combineReducers({
  todoItems: todoItemsReducer,
});
