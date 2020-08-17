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

export const selectTodos = createSelector(
    [selectListByID],
    list => list?.todos
)

export const selectLocalView = createSelector(
    [selectListByID],
    list => list?.localView
)


    
