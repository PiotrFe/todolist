import { createSelector } from "reselect";

const selectListByID = (state, props) => {
  // debugger;
  if (props.listID === "Cockpit") {
    return state.todoCockpit;
  } else {
    return state.todoListsContainer.todoLists.find(
      (list) => list._id === props.listID
    );
  }
};

export const selectFilters = createSelector(selectListByID, (list) =>
  list ? list.filters : []
);

// export const selectLoading = createSelector(
//     [selectToDoContainer],
//     container => container.loading
// )

// export const selectError = createSelector(
//     [selectToDoContainer],
//     container => container.error
// )

// export const selectToDosCount = createSelector(
//     [selectToDoLists],
//     lists => lists.length
// );
// [selectToDos],
// todos => todos.length

// export const selectToDosDoneCount = createSelector();
// [selectToDos],
// todos => todos.reduce((acc, todoItem) => todoItem.done ? acc = acc + 1 : acc, 0)

// export const selectToDosPendingCount = createSelector();
// [selectToDos],
// todos => todos.reduce((acc, todoItem) => todoItem.done ? acc : acc = acc + 1, 0)

// export const selectSorts = createSelector(
//     [selectToDoContainer],
//     container => container.sorts
// )
