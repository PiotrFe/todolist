import { ToDosActiontypes } from "./todo-container.types";

const {
  ADD_TODO,
  ASYNC_ACTION_BEGIN,
  DROP_TODO,
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

const updateItem = (item, field, value) => {
  return {...item, ...{[field]: value}};
}

const reorderItem = (todoItems, {idxFrom, idxTo}) => {

  const reorderedArray = [...todoItems];
  const item = reorderedArray.splice(idxFrom, 1)[0];
  console.log(`ITEM: ${JSON.stringify(item)}`);
  console.log(`FROM: ${idxFrom}`);
  console.log(`TO: ${idxTo}`);
  reorderedArray.splice(idxTo, 0, item);

  return reorderedArray;

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
    case DROP_TODO: 
      return {
        ...state,
        todoItems: reorderItem(state.todoItems, action.payload)
      }
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
            const {field, value} = action.payload;
            item = updateItem(item, field, value)
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
