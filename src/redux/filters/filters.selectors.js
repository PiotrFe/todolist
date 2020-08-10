import { createSelector } from "reselect";

const selectFiltersByListID = (state, props) => state.filters.byID[props.listID]

export const selectFilters = createSelector(
    selectFiltersByListID,
    filters => filters
)