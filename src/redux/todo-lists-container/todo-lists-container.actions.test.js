import { ToDoListsActionTypes } from "./todo-lists-container.types";

import * as actions from "./todo-lists-container.actions";

import {
  fetchLists,
  fetchListsSuccess,
  fetchListsFailure,
} from "./todo-lists-container.actions";

const {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
} = ToDoListsActionTypes;

describe("todo-lists-container actions", () => {
  it("should create fetch lists start action", () => {
    const expectedAction = {
      type: FETCH_LISTS_START,
    };

    expect(actions.fetchLists()).toEqual(expectedAction);
  });

  it("should create fetch lists success action", () => {
    const payload = "action payload";
    const expectedAction = {
      type: FETCH_LISTS_SUCCESS,
      payload,
    };

    expect(actions.fetchListsSuccess(payload)).toEqual(expectedAction);
  });

  it("should create fetch lists failure action", () => {
      const payload = "action error";
      const expectedAction = {
          type: FETCH_LISTS_FAILURE,
          payload
      }

      expect(actions.fetchListsFailure(payload)).toEqual(expectedAction);
  })
});
