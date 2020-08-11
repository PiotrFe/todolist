import { createSelector } from "reselect";
import { MAIN_INPUT_ID } from "../../constants/constants";

const selectFilterBar = (state) => state.filterBar;
const selectMainFilterBar = (state) => state.filterBar.previewByListID[MAIN_INPUT_ID];
const selectFilterPreviewByID = (state, props) => state.filterBar.previewByListID[props.listID];
const selectGlobalFilteredDataByListID = (state, props) => state.filterBar.globalFilteredData[props.listID]
  
export const selectFilterPreview = createSelector(
  [selectFilterPreviewByID],
  (list) => list?.preview
);

export const selectFilterLoading = createSelector(
  [selectFilterPreviewByID],
  (list) => list?.loading
);

export const selectFilters = createSelector(
  [selectFilterPreviewByID],
  (list) => list?.filters
);

export const selectFilteredDataFromMainInput = createSelector(
  [selectMainFilterBar],
  (input) => input?.todoData
);

export const selectDataFromMainFilter = createSelector(
  selectGlobalFilteredDataByListID,
  (data) => {
    if (data) return data;
    else return [];
  }
);


