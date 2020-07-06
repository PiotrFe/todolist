import { put } from "redux-saga/effects";

import {
  fetchListsSuccess,
} from "./todo-lists-container.actions";
import * as sagas from "./todo-lists-container.sagas";

describe("ToDoListsContainer saga", () => {
  const mockFetch = (expectedResult) => (...args) => {
    return Promise.resolve({
      json: () => Promise.resolve(expectedResult),
    });
  };

  const setup = async (expectedResult) => {
    const fetch = mockFetch(expectedResult);
    global.fetch = fetch;

    const resObj = await fetch(null);
    const resPromise = resObj.json();
    const resJSON = await resObj.json();

    return {
      resObj,
      resPromise,
      resJSON,
    };
  };

  it("fetchLists should call api and dispatch success action", async () => {
    const lists = ["list1", "list2", "list3"];
    const { resObj, resPromise, resJSON } = await setup(lists);

    const gen = sagas.fetchLists();
    expect(gen.next().value).toEqual(fetch());
    expect(gen.next(resObj).value).toEqual(resPromise);
    expect(gen.next(resJSON).value).toEqual(put(fetchListsSuccess(lists)));
  });
});
