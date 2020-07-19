import todoItemReducer from "./todo-item.reducer";

import { ToDoActionTypes } from "./todo-item.types";
import { TodoContainerTypes } from "../todo-container/todo-container.types";

describe("todo-item reducer", () => {
  const INITIAL_STATE = {
    detailsVisible: false,
  };

  const setup = (propOverrides = {}) => {
    return Object.assign({}, INITIAL_STATE, propOverrides);
  };

  it("returns initial state", () => {
    expect(todoItemReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("handles TOGGLE_DETAILS action", () => {
    const state = setup();
    const expectedState = setup({ detailsVisible: true });
    const action = {
      type: TodoContainerTypes.TOGGLE_DETAILS,
    };
    expect(todoItemReducer(state, action)).toEqual(expectedState);
  });
});
