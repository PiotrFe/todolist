import { ToDosActiontypes } from "./todo-container.types";
import { ToDoFields, ActionTypes } from "../../constants/constants";

import todoContainerReducer from "./todo-container.reducer";

describe("TodoContainer reducer", () => {
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

  const firstToDo = { _id: 1, title: "first todo" };
  const secondToDo = { _id: 2, title: "second todo" };

  const setup = (stateOverrides) => {
    return Object.assign({}, INITIAL_STATE, stateOverrides);
  };

  it("returns initial state", () => {
    expect(todoContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("handles REMOVE_TODO_SUCCESS action", () => {
    const state = setup({
      todoItems: [firstToDo, secondToDo],
      loading: true,
    });

    const action = {
      type: ToDosActiontypes.REMOVE_TODO_SUCCESS,
      payload: firstToDo._id,
    };

    const expectedState = setup({
      todoItems: [secondToDo],
      loading: false,
    });

    expect(todoContainerReducer(state, action)).toEqual(expectedState);
  });

  it("handles FETCH_TODOS_SUCCESS action", () => {
    const state = setup({ loading: true });
    const payload = [firstToDo, secondToDo];
    const action = { type: ToDosActiontypes.FETCH_TODOS_SUCCESS, payload };
    const expectedState = setup({ todoItems: payload, loading: false });

    expect(todoContainerReducer(state, action)).toEqual(expectedState);
  });

  it("handles ADD_TODO_SUCCESS action", () => {
    const state = setup({ loading: true });
    const action = {
      type: ToDosActiontypes.ADD_TODO_SUCCESS,
      payload: firstToDo,
    };
    const expectedState = setup({
      todoItems: [action.payload],
      loading: false,
    });

    expect(todoContainerReducer(state, action)).toEqual(expectedState);
  });
});
