import { createSelector } from "reselect";

import { MAIN_INPUT_ID } from "../../constants/constants";

const selectFiltersByListID = (state, props) => state.filters.byID[props.listID];
const selectFiltersFromMainSearchBar = (state) => state.filters.byID[MAIN_INPUT_ID];

export const selectFilters = createSelector(
    selectFiltersByListID,
    filters => filters
)

export const selectGlobalFilters = createSelector(
 selectFiltersFromMainSearchBar,
  (filters) => {
      if (filters) return filters;
      else return [];
  }
);