import { createSelector } from "reselect";
import { MAIN_INPUT_ID } from "../../constants/constants";

const selectFilterBar = (state) => state.filterBar;
const selectMainFilterBar = (state) => state.filterBar[MAIN_INPUT_ID];
const selectFilterPreviewByID = (state, props) => state.filterBar[props.listID];
const selectFilteredDataFromMainInputByListID = (state, props) =>
  state.filterBar[MAIN_INPUT_ID]?.todoData?.find(({_id}) => {
    return _id === props.listID;
  });

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
  selectMainFilterBar,
  selectFilteredDataFromMainInputByListID,
  (filterBar, data) => ({
    filters: filterBar?.filters,
    todos: data?.todos
  })
);

export const selectActiveFiltersFromMainFilter = createSelector(
  selectMainFilterBar,
  (filterBar) => filterBar?.filters
);
