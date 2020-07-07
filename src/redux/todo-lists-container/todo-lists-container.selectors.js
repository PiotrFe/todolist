import { createSelector } from "reselect";

export const selectToDoLists = state => state.todoListsContainer.todoLists;
export const selectLoading = state => state.todoListsContainer.loading;