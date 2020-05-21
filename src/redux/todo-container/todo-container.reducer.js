import { ToDosActiontypes } from "./todo-container.types";

const {
  ADD_TODO,
  ASYNC_ACTION_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  REMOVE_TODO,
  UPDATE_TODO
} = ToDosActiontypes;

const INITIAL_STATE = {
  todoItems: [],
  loading: false,
  error: null,
};

const updateItem = (item, entry) => {
  const [field, value] = entry;
  return {...item, ...{[field]: value}};
}

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
    case REMOVE_TODO:
      return {
        ...state,
        loading: false,
        todoItems: state.todoItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case UPDATE_TODO: {
      return {
        ...state,
        loading: false,
        todoItems: state.todoItems.map(item => {
          if (item._id === action.payload._id) {
            const entry = Object.entries(action.payload)[1];
            item = updateItem(item, entry)
          }
          return item;
        })

      }
    }
    default:
      return state;
  }
};

export default todoContainerReducer;
