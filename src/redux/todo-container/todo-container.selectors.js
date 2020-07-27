import { createSelector } from "reselect";

const selectListByID = (state, props) => {
  if (props.listID === "Cockpit") {
    return state.todoCockpit;
  } else {
    return state.todoListsContainer.todoLists.find(
      (list) => list._id === props.listID
    );
  }
};

export const selectSorts = createSelector(
  [selectListByID],
  (list) => list?.sorts
);

