import { createSelector } from "reselect";
import { MAIN_INPUT_ID } from "../../constants/constants";

const selectToDoItems = (state) => state.todoItems.byID;
const selectToDoItemsSubset = (state, props) => {
  const list = state.todoLists.byID[props.listID];
  const globalFiltersCount = state.filters.byID[MAIN_INPUT_ID]?.length;
  const idArray = globalFiltersCount > 0 ? list.itemsFilteredGlobally : list.itemsFilteredLocally;
  const allItems = state.todoItems.byID;
  let itemSubset = [];

  for (let id of idArray) {
    itemSubset = [
      ...itemSubset,
      allItems[id]
    ]
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
