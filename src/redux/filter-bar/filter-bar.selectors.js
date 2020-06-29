import { createSelector } from "reselect";

const selectFilterBar = (state) => state.filterBar;

export const selectFilterPreview = createSelector(
  [selectFilterBar],
  (filterBar) => filterBar.filterPreview
);
