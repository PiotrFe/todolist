import { combineReducers } from "redux";

import TodoListsContainerReducer from "./todo-lists-container/todo-lists-container.reducer";
import todoContainerReducer from "./todo-container/todo-container.reducer";
import todoItemReducer from "./todo-item/todo-item.reducer";
import filterBarReducer from "./filter-bar/filter-bar.reducer";


export default combineReducers({
  todoListsContainer: TodoListsContainerReducer,
  todoContainer: todoContainerReducer,
  todoItem: todoItemReducer,
  filterBar: filterBarReducer
});
