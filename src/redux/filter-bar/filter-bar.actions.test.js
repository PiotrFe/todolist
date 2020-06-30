import * as actions from "./filter-bar.actions";

import { FilterBarTypes } from "./filter-bar.types";

describe("FilterBar actions", () => {
    it("creates FETCH_FILTER_PREVIEW_START action", () => {
        const payload = "test";
        const expectedAction = {
            type: FilterBarTypes.FETCH_FILTER_PREVIEW_START,
            payload
        }

        expect(actions.showFilterPreview(payload)).toEqual(expectedAction);
    })

    it("creates FETCH_FILTER_PREVIEW_SUCCESS action", () => {
        const payload = "test";
        const expectedAction = {
            type: FilterBarTypes.FETCH_FILTER_PREVIEW_SUCCESS,
            payload
        }

        expect(actions.showFilterPreviewSuccess(payload)).toEqual(expectedAction);
    })

    it("creates FETCH_FILTER_PREVIEW_FAILURE action", () => {
        const payload = "test";
        const expectedAction = {
            type: FilterBarTypes.FETCH_FILTER_PREVIEW_FAILURE,
            payload
        }

        expect(actions.showFilterPreviewFailure(payload)).toEqual(expectedAction);
    })
})