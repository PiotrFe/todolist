import { ToDosActiontypes } from "./todo-container.types";
import { ToDoFields } from "../../constants/constants";

const {
  ADD_FILTER,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_FILTER,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_SORTS,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} = ToDosActiontypes;

const INITIAL_STATE = {
  todoItems: [],
  filters: [],
  sorts: [
    { field: ToDoFields.TITLE, sortDirection: 0 },
    { field: ToDoFields.DUE_DATE, sortDirection: 1 },
    { field: ToDoFields.OWNER, sortDirection: 0 },
    { field: ToDoFields.COLOR, sortDirection: 0 },
  ],
  loading: false,
  error: null,
};

const updateItem = (item, field, value) => {
  return { ...item, ...{ [field]: value } };
};

const reorderItem = (todoItems, { idxFrom, idxTo }) => {
  const reorderedArray = [...todoItems];
  const item = reorderedArray.splice(idxFrom, 1)[0];
  reorderedArray.splice(idxTo, 0, item);

  return reorderedArray;
};

const todoContainerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASYNC_ACTION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case DROP_TODO:
      return {
        ...state,
        todoItems: reorderItem(state.todoItems, action.payload),
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
        ),
      };
    case UPDATE_SORTS:
      return {
        ...state,
        sorts: state.sorts.map((item) => {
          if (item.field === action.payload) {
            switch (item.sortDirection) {
              case 0:
                item.sortDirection = 1;
                break;
              case 1:
                item.sortDirection = -1;
                break;
              case -1:
                item.sortDirection = 0;
                break;
            }
          } else {
            item.sortDirection = 0;
          }
          return item;
        }),
      };


    default:
      return state;
  }
};

export default todoContainerReducer;
