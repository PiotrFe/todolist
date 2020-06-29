import { combineReducers } from "redux";

import todoContainerReducer from "./todo-container/todo-container.reducer";
import todoItemReducer from "./todo-item/todo-item.reducer";
import filterBarReducer from "./filter-bar/filter-bar.reducer";

export default combineReducers({
  todoContainer: todoContainerReducer,
  todoItem: todoItemReducer,
  filterBar: filterBarReducer
});
