import { ToDoActiontypes } from "./todo-items.types";

const {
  ADD_TODO,
  FETCH_TODOS_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} = ToDoActiontypes;

const INITIAL_STATE = {
  todoItems: [],
  loading: false,
  error: null,
};

const todoItemsReducer = (state = INITIAL_STATE, action) => {
    console.log(`Action dispatched: ${JSON.stringify(action)}`);
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoItems: [...state.todoItems, ...action.payload]
      };
    case FETCH_TODOS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TODOS_SUCCESS: {
        console.log(`In reducer now, payload: ${action.payload.items}`)
      return {
        ...state,
        loading: false,
        todoItems: action.payload
      };
    }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        todoItems: [],
        error: action.payload.error,
      };
    default: {
        console.log(`Landed in the unknown section`);
        return state;
    }
      
  }
};

export default todoItemsReducer;
