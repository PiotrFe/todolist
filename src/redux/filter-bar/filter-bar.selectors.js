import { createSelector } from "reselect";

const selectFilterBar = (state) => state.filterBar;
const selectFilterPreviewByID = (state, props) => state.filterBar[props.listID]

export const selectFilterPreview = createSelector(
  [selectFilterPreviewByID],
  (filterPreview) => filterPreview
);
