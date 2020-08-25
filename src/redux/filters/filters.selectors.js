import { createSelector } from "reselect";

import { MAIN_INPUT_ID } from "../../constants/constants";

const selectFiltersByListID = (state, props) => state.filters.byID[props.listID];
const selectFiltersFromMainSearchBar = (state) => state.filters.byID[MAIN_INPUT_ID];
const selectGlobalFilteredDataByListID = (state, props) => state.filterBar.globalFilteredData[props.listID]

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

export const selectGlobalFilteredData = createSelector(
    selectGlobalFilteredDataByListID,
    filteredIDs => {
        if (filteredIDs) return filteredIDs;
        else return []
    }
);

export const selectGlobalFiltersCount = createSelector(
    selectFiltersFromMainSearchBar,
    filters => {
        if (filters) return filters.length;
        else return 0;
    }
)