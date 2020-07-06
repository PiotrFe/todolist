import TodoListsContainerReducer from "./todo-lists-container.reducer";

import {
  fetchLists,
  fetchListsSuccess,
  fetchListsFailure,
} from "./todo-lists-container.actions";

import { ToDoListsActionTypes } from "./todo-lists-container.types";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
} = ToDoListsActionTypes;

describe("to do lists container reducer", () => {
  const INITIAL_STATE = {
    todoLists: [],
    loading: false,
    error: null,
  };

  const setup = (stateOverrides) =>
    Object.assign({}, INITIAL_STATE, stateOverrides);

  it("returns initial state", () => {
    expect(TodoListsContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("handles FETCH_LISTS_START action", () => {
    const state = setup();
    const expectedState = setup({ loading: true });
    const action = fetchLists();

    expect(TodoListsContainerReducer(state, action)).toEqual(expectedState);
  });

  it("handles FETCH_LISTS_SUCCESS action", () => {
    const state = setup({loading: true});
    const payload = ["list 1", "list 2", "list 3"];
    const action = fetchListsSuccess(payload);
    const expectedState = setup({
        loading: false,
        todoLists: payload
    })

    expect(TodoListsContainerReducer(state, action)).toEqual(expectedState);
  })

  it("handles FETCH_LISTS_ERROR action", () => {
    const state = setup({loading: true});
    const payload = "error message";
    const action = fetchListsFailure(payload);
    const expectedState = setup({
        loading: false,
        error: payload
    })

    expect(TodoListsContainerReducer(state, action)).toEqual(expectedState);
  })
});
