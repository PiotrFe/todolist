import * as actions from "./filter-bar.actions";

import { FilterBarTypes } from "./filter-bar.types";
import { FilterTypes } from "../filters/filter.types";

describe("FilterBar actions", () => {
  it("creates FETCH_FILTER_PREVIEW_START action", () => {
    const payload = {
      listID: 123,
      filters: [],
      word: "word",
    };
    const expectedAction = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_START,
      payload,
    };

    expect(actions.showFilterPreview(payload)).toEqual(expectedAction);
  });

  it("creates FETCH_FILTER_PREVIEW_SUCCESS action", () => {
    const payload = "test";
    const expectedAction = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_SUCCESS,
      payload,
    };

    expect(actions.showFilterPreviewSuccess(payload)).toEqual(expectedAction);
  });

  it("creates FETCH_FILTER_PREVIEW_FAILURE action", () => {
    const payload = "test";
    const expectedAction = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_FAILURE,
      payload,
    };

    expect(actions.showFilterPreviewFailure(payload)).toEqual(expectedAction);
  });

  it("creates a CLEAR_FILTER_PREVIEW action", () => {
    const payload = 123;
    const expectedAction = {
      type: FilterBarTypes.CLEAR_FILTER_PREVIEW,
      payload: {
        listID: 123,
      },
    };

    expect(actions.clearFilterPreview(payload)).toEqual(expectedAction);
  });

  it("creates a SET_PREVIEW_LOADING action", () => {
    const payload = 123;
    const expectedAction = {
      type: FilterBarTypes.SET_PREVIEW_LOADING,
      payload: {
        listID: 123,
      },
    };

    expect(actions.setPreviewLoading(payload)).toEqual(expectedAction);
  });

  it("creates ADD_FILTER action", () => {
      const payload = {
          listID: 123,
          filter: "filter"
      }
      const expectedAction = {
          type: FilterTypes.ADD_FILTER,
          payload
      }

      expect(actions.addFilter(payload)).toEqual(expectedAction);
  })
});
