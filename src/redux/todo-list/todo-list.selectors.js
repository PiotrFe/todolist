import { createSelector } from "reselect";

const selectListByID = (state, props) => (
    state.todoLists.byID[props.listID]
);

export const selectFilters = createSelector(
    [selectListByID],
    list => list?.filters
);

export const selectSorts = createSelector(
    [selectListByID],
    list => list?.sorts
)

export const selectTitle = createSelector(
    [selectListByID],
    list => list?.title
)

export const selectAllItems = createSelector(
    [selectListByID],
    list => list?.allItems
)

export const selectItemsFilteredLocally = createSelector(
    [selectListByID],
    list => list?.itemsFilteredLocally
)

export const selectItemsFilteredGlobally = createSelector(
    [selectListByID],
    list => list?.itemsFilteredGlobally
)


    
