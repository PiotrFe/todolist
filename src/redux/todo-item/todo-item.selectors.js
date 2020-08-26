import { createSelector } from "reselect";

const selectToDoItems = (state) => state.todoItems.byID;
const selectToDoItemsSubset = (state, props) => {
  const list = state.todoLists.byID[props.listID]
  const idArray = props.globalFiltersCount > 0 ? list.itemsFilteredGlobally : list.itemsFilteredLocally;
  const allItems = state.todoItems.byID;
  let itemSubset = [];

  for (let item in allItems) {
      if (idArray.includes(item)) {
        itemSubset = [
          ...itemSubset,
          allItems[item]
        ]
      }
  }
  return itemSubset;
}
const selectTodoByID = (state, props) => state.todoItems.byID[props._id];

export const selectToDos = createSelector(
  selectToDoItems,
  items => items
)

export const selectColor = createSelector(
  [selectTodoByID],
  (item) => item?.color
);

export const selectDetails = createSelector(
  [selectTodoByID],
  (item) => item?.details
);

export const selectDone = createSelector(
  [selectTodoByID],
  (item) => item?.done
);

export const selectDueDate = createSelector(
  [selectTodoByID],
  (item) => item?.dueDate
);

export const selectListIDs = createSelector(
  [selectTodoByID],
  (item) => item?.lists
);

export const selectOwner = createSelector(
  [selectTodoByID],
  (item) => item?.owner
);

export const selectTitle = createSelector(
  selectTodoByID,
  (item) => item?.title
);

export const selectVisibleItems = createSelector(
  selectToDoItemsSubset,
  items => items
)
