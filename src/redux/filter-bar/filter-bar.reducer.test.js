import FilterBarReducer from "./filter-bar.reducer";

import * as actions from "./filter-bar.actions";
import { FilterBarTypes } from "./filter-bar.types";

describe("FilterBarReducer", () => {
  const INITIAL_STATE = {
    filterPreview: [],
    error: null,
  };

  const setup = (stateOverrides) => {
    return Object.assign({}, INITIAL_STATE, stateOverrides);
  };

  it("returns initial state", () => {
    expect(FilterBarReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("handles FETCH_FILTER_PREVIEW_SUCCESS action", () => {
    const filterPreview = ["filter 1", "filter 2", "filter 3"];
    const action = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_SUCCESS,
      payload: filterPreview,
    };
    const state = setup();
    const expectedState = setup({
      filterPreview,
    });

    expect(FilterBarReducer(state, action)).toEqual(expectedState);
  });

  it("handles FETCH_FILTER_PREVIEW_SUCCESS action", () => {
      const error = "FAILED TO FETCH";
      const action = {
          type: FilterBarTypes.FETCH_FILTER_PREVIEW_FAILURE,
          payload: error
      }
      const state = setup();
      const expectedState = setup({
          error
      })

      expect(FilterBarReducer(state, action)).toEqual(expectedState);
  })
});
