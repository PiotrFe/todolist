import { ToDosActiontypes } from "./todo-container.types";
import { ToDoFields } from "../../constants/constants";

const {
  ADD_TODO,
  ADD_FILTER,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_FILTER,
  REMOVE_TODO,
  UPDATE_SORTS,
  UPDATE_TODO,
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
    case ADD_TODO:
      return {
        ...state,
        loading: false,
        todoItems: [...state.todoItems, action.payload],
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
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todoItems: action.payload,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        todoItems: [],
        error: action.payload.error,
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        loading: false,
        todoItems: state.todoItems.filter(
          (item) => item._id !== action.payload
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
    case UPDATE_TODO: {
      return {
        ...state,
        loading: false,
        todoItems: state.todoItems.map((item) => {
          if (item._id === action.payload._id) {
            const { field, value } = action.payload;
            item = updateItem(item, field, value);
          }
          return item;
        }),
      };
    }
    default:
      return state;
  }
};

export default todoContainerReducer;
