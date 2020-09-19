import { combineReducers } from "redux";

import ToDoCockpitReducer from "./todo-cockpit/todo-cockpit.reducer";
import TodoListsContainerReducer from "./todo-lists-container/todo-lists-container.reducer";
import TodoListsReducer from "./todo-list/todo-list.reducer";
import TodoItemsReducer from "./todo-item/todo-item.reducer";
import filterBarReducer from "./filter-bar/filter-bar.reducer";
import FiltersReducer from "./filters/filters.reducer";
import SortsReducer from "./sorts/sorts.reducer";
import SignInSignUpReducer from "./sign-in-sign-up-page/sign-in-sign-up-page.reducer";
import ErrorAlertReducer from "./error-alert/error-alert.reducer";

export default combineReducers({
  todoListsContainer: TodoListsContainerReducer,
  todoCockpit: ToDoCockpitReducer,
  todoLists: TodoListsReducer,
  todoItems: TodoItemsReducer,
  filterBar: filterBarReducer,
  filters: FiltersReducer,
  sorts: SortsReducer,
  auth: SignInSignUpReducer,
  errors: ErrorAlertReducer
});
