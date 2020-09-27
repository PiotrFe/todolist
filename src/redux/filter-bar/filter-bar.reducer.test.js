import FilterBarReducer from "./filter-bar.reducer";
import * as actions from "./filter-bar.actions";
import { FilterBarTypes } from "./filter-bar.types";
import { FilterTypes } from "../filters/filter.types";

describe("FilterBarReducer", () => {
  const INITIAL_STATE = {
    previewByListID: {},
  };

  const setup = (stateOverrides) =>
    Object.assign({}, INITIAL_STATE, stateOverrides);

  it("returns default state", () => {
    expect(FilterBarReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("handles SET_PREVIEW_LOADING action", () => {
    const state = setup();
    const action = {
      type: FilterBarTypes.SET_PREVIEW_LOADING,
      payload: {
        listID: 123,
      },
    };
    const expectedState = {
      previewByListID: {
        123: {
          loading: true,
        },
      },
    };
    expect(FilterBarReducer(state, action)).toEqual(expectedState);
  });

  it("handles FETCH_FILTER_PREVIEW_SUCCESS action", () => {
    const state = setup({
      previewByListID: {
        123: {
          loading: true,
        },
      },
    });
    const action = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_SUCCESS,
      payload: {
        listID: 123,
        data: ["preview 1", "preview 2"],
      },
    };
    const expectedState = {
      previewByListID: {
        123: {
          loading: false,
          preview: ["preview 1", "preview 2"],
          error: "",
        },
      },
    };

    expect(FilterBarReducer(state, action)).toEqual(expectedState);
  });

  it("handles FETCH_FILTER_PREVIEW_FAILURE action", () => {
    const state = setup({
      previewByListID: {
        123: {
          loading: true,
        },
      },
    });

    const action = {
      type: FilterBarTypes.FETCH_FILTER_PREVIEW_FAILURE,
      payload: {
        listID: 123,
        error: "an error occurred",
      },
    };

    const expectedState = {
      previewByListID: {
        123: {
          loading: false,
          error: "an error occurred",
        },
      },
    };

    expect(FilterBarReducer(state, action)).toEqual(expectedState);
  });

  it("handles CLEAR_FILTER_PREVIEW action", () => {
    const state = setup({
      previewByListID: {
        123: {
          loading: false,
          error: "",
          preview: {
            item1: "value1",
            item2: "value2",
          },
        },
      },
    });

    const action = {
      type: FilterBarTypes.CLEAR_FILTER_PREVIEW,
      payload: { listID: 123 },
    };

    const expectedState = {
      previewByListID: {
        123: {
          loading: false,
          error: "",
          preview: {}
        }
      }
    }
    expect(FilterBarReducer(state, action)).toEqual(expectedState);
  });
});
