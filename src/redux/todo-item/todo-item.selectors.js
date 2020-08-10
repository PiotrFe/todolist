import { createSelector } from "reselect";

const selectTodoByID = (state, props) => state.todoItems.byID[props._id];

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
