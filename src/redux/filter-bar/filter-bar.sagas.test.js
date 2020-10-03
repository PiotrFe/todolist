import { takeLatest, take, put, call, all } from "redux-saga/effects";

import * as sagas from "./filter-bar.sagas";

import { FilterBarTypes } from "./filter-bar.types";
import {
  showFilterPreviewSuccess,
  showFilterPreviewFailure,
  setPreviewLoading,
  clearFilterPreview,
  fetchToDoSSuccess,
  fetchToDoSFailure,
  fetchFilteredToDosMainInputSuccess,
  fetchFilteredToDosMainInputFailure,
} from "./filter-bar.actions";

import { asyncActionStart } from "../todo-lists-container/todo-lists-container.actions";

import { MAIN_INPUT_ID } from "../../constants/constants";

const setup = async (expectedResult) => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(expectedResult),
    })
  );
};

const setupError = async (errorMessage) => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    throw Error(errorMessage);
  });
};

describe("FilterBar sagas", () => {
  it("fetchPreview should call setPreviewLoading action, get data from API and call success action", async () => {
    expect.assertions(4);

    const listID = 123;
    const value = "data";

    const action = { payload: { listID, filters: [], word: "test" } };
    const expectedResult = {
      listID,
      value,
    };

    setup(expectedResult);
    const res = await fetch();
    const data = await res.json();

    const gen = sagas.fetchPreview(action);

    expect(gen.next().value).toEqual(put(setPreviewLoading(listID)));
    expect(gen.next().value).toEqual(fetch());
    expect(gen.next(res).value).toEqual(res.json());
    expect(gen.next(data).value).toEqual(
      put(showFilterPreviewSuccess({ listID, data }))
    );
  });

  it("fetchPreview should call setPreviewLoading action, get data from API and call failure action on error", async () => {
    expect.assertions(2);

    const listID = 123;
    const action = { payload: { listID, filters: [], word: "test" } };

    setupError("Server error");
    const gen = sagas.fetchPreview(action);

    expect(gen.next().value).toEqual(put(setPreviewLoading(listID)));

    try {
      await fetch();
    } catch (error) {
      expect(gen.next().value).toEqual(
        put(showFilterPreviewFailure({ listID, error }))
      );
    }
  });

  it("fetchFilteredToDos should call asyncActionStart, clearFilterPreview, get data from api and call success action", async () => {
    expect.assertions(6);

    const listID = 456;
    const filters = [];
    const sorts = [];
    const action = { payload: { listID, filters, sorts } };
    const expectedResult = {
      data: "this is data",
      filters,
      sorts,
    };

    setup(expectedResult);

    const res = await fetch();
    const data = await res.json();

    const gen = sagas.fetchFilteredToDos(action);

    expect(gen.next().value).toEqual(put(asyncActionStart()));
    expect(gen.next().value).toEqual(put(clearFilterPreview(listID)));
    expect(gen.next().value).toEqual(fetch());
    expect(gen.next(res).value).toEqual(res.json());
    expect(gen.next(data).value).toEqual(
      put(fetchToDoSSuccess({ listID, todos: data, filters, sorts }))
    );

    const action2 = { payload: { listID: MAIN_INPUT_ID, filters, sorts } };

    const gen2 = sagas.fetchFilteredToDos(action2);

    gen2.next();
    gen2.next();
    gen2.next();
    gen2.next(res);
    expect(gen2.next(data).value).toEqual(
      put(fetchFilteredToDosMainInputSuccess({ data, filters }))
    );
  });

  it("fetchFilteredToDos should call asyncActionStart, clearFilterPreview, get data from api and call failure action on error", async () => {
    const action = { payload: { listID: 456 } };
    const action2 = { payload: { listID: MAIN_INPUT_ID } };

    setupError("Server error");

    const gen = sagas.fetchFilteredToDos(action);
    const gen2 = sagas.fetchFilteredToDos(action2);

    expect(gen.next().value).toEqual(put(asyncActionStart()));
    expect(gen2.next().value).toEqual(put(asyncActionStart()));
    expect(gen.next().value).toEqual(put(clearFilterPreview(456)));
    expect(gen2.next().value).toEqual(put(clearFilterPreview(MAIN_INPUT_ID)));

    try {
      await fetch();
    } catch (error) {
      expect(gen.next().value).toEqual(
        put(fetchToDoSFailure({ listID: 456, error }))
      );
      expect(gen2.next().value).toEqual(
        put(fetchFilteredToDosMainInputFailure({ error }))
      );
    }
  });
});
