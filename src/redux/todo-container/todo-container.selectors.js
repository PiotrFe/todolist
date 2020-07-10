import { createSelector } from "reselect";
import { PromiseProvider } from "mongoose";

// const selectToDoLists = (state, props) => {
//     const lists = state.todoListsContainer.todoLists;
//     console.dir(`STATE: ${JSON.stringify(state)}`);
//     console.dir(`PROPS: ${JSON.stringify(props)}`);
//     console.dir(`LISTS: ${JSON.stringify(lists)}`);
//     debugger;
// } 

// export const selectToDos = createSelector(
//     [selectToDoContainer],
//     container => container.todoItems
// )

const selectListByID = (state, props) => state.todoListsContainer.todoLists.find(list => list._id === props.listID);

// export const selectLists = createSelector(
//     selectToDoLists,
//     // (list) => list.owner  
//     lists => lists  
// )


export const selectFilters = createSelector(
    selectListByID,
    list => list.filters  
)


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
