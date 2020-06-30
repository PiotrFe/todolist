import { takeLatest, take, put, call, all } from "redux-saga/effects";

import * as sagas from "./filter-bar.sagas";

import { FilterBarTypes } from "./filter-bar.types";
import {
  showFilterPreviewSuccess,
  showFilterPreviewFailure,
} from "./filter-bar.actions";

const setup = async (expectedResult) => {
  const mockFetch = (expectedResult) => (...args) =>
    Promise.resolve({
      json: () => Promise.resolve(expectedResult),
    });

  const fetch = mockFetch(expectedResult);
  global.fetch = fetch;

  const resObject = await fetch(null);
  const jsonPromise = resObject.json();
  const jsonData = await resObject.json();

  return {
    resObject,
    jsonPromise,
    jsonData,
  };
};

describe("FilterBar sagas", () => {
  it("fetchPreview should get data from API and call success action", async () => {
    const expectedPreview = ["todo1", "todo2", "todo3"];
    const { resObject, jsonPromise, jsonData } = await setup(expectedPreview);
    const action = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_START,
      payload: {
        word: "test",
        filters: [],
      },
    };

    const gen = sagas.fetchPreview(action);

    expect(gen.next().value).toEqual(fetch("whatever"));
    expect(gen.next(resObject).value).toEqual(jsonPromise);
    expect(gen.next(jsonData).value).toEqual(
      put(showFilterPreviewSuccess(jsonData))
    );
  });
});
