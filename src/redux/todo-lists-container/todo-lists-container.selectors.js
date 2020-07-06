import { createSelector } from "reselect";

export const selectToDoLists = state => state.todoListsContainer.todoLists;