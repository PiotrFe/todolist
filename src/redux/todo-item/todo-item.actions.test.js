import * as actions from "./todo-item.actions";

import { ToDoActionTypes } from "./todo-item.types";

const { TOGGLE_DETAILS } = ToDoActionTypes;

describe("todo-item actions", () => {
  it("should create toggle details action", () => {
    const expectedAction = {
      type: TOGGLE_DETAILS,
    };

    expect(actions.toggleDetails()).toEqual(expectedAction);
  });
});
