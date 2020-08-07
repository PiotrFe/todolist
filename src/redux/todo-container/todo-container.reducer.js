import { TodoContainerTypes } from "./todo-container.types";

const {
  ASYNC_ACTION_BEGIN,
} = TodoContainerTypes;

const INITIAL_STATE = {
  todos: [],
  filters: [],

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
    default:
      return state;
  }
};

export default todoContainerReducer;
