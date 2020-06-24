import configureStore from 'redux-mock-store'

import * as actions from "./todo-container.actions";

import { ToDosActiontypes } from "./todo-container.types";

describe("Todo container actions", () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);

  it("should create remove action", () => {
    const id = 123;
    const expectedAction = {
      type: ToDosActiontypes.REMOVE_TODO_START,
      payload: id,
    };
    expect(actions.removeToDo(id)).toEqual(expectedAction);
  });

  it("begins an async action", () => {
      const store = mockStore();
      const { ASYNC_ACTION_BEGIN } = ToDosActiontypes;

      store.dispatch(actions.asyncActionBegin());
      const action = store.getActions();
      const expectedAction = {
          type: ASYNC_ACTION_BEGIN
      }

      expect(action).toEqual([expectedAction]);

  })
});
