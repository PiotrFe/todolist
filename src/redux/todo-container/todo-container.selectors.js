import {createSelector} from "reselect";

const selectToDoContainer = state => state.todoContainer;

export const selectToDos = createSelector(
    [selectToDoContainer],
    container => container.todoItems
)

export const selectLoading = createSelector(
    [selectToDoContainer],
    container => container.loading
)

export const selectError = createSelector(
    [selectToDoContainer],
    container => container.error
)

export const selectToDosCount = createSelector(
    [selectToDos],
    todos => todos.length
)

export const selectToDosDoneCount = createSelector(
    [selectToDos],
    todos => todos.reduce((acc, todoItem) => todoItem.done ? acc = acc + 1 : acc, 0)
)

export const selectToDosPendingCount = createSelector(
    [selectToDos],
    todos => todos.reduce((acc, todoItem) => todoItem.done ? acc : acc = acc + 1, 0)
)

