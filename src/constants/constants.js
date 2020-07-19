export const ActionTypes = {
  ADD: "add",
  CANCEL: "cancel",
  CHANGE: "change",
  CHANGE_COLOR: "change_color",
  DONE: "done",
  DRAG: "drag",
  EDIT: "edit",
  FOCUS: "focus",
  REMOVE: "remove",
  SEARCH: "search",
  SORT: "sort",
  SUBMIT: "submit",
  TOGGLE_DETAILS: "toggleDetails",
  UPDATE: "update"
};

export const ToDoFields = {
  TITLE: "title",
  DETAILS: "details",
  DRAFT: "draft",
  DETAILS_DRAFT: "detailsDraft",
  OWNER: "owner",
  DUE_DATE: "dueDate",
  DONE: "done",
  EDIT_MODE: "editMode",
  DETAILS_VISIBLE: "detailsVisible",
  COLOR: "color"
}

export const Sizes = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small"
};

export const Components = {
  TODO_ITEM: "todo-item",
  INPUT_FIELD: "input-field"
};

export const ToDoCategories = {
  RED: "red",
  YELLOW: "yellow",
  GREEN: "green"
}

export const Colors = {
  COLOR_PRIMARY_LIGHT: "#bbe1fa",
  COLOR_PRIMARY_MEDIUM: "#3282b8",
  COLOR_PRIMARY_DARK: "#0f4c75",
  COLOR_PRIMARY_VERY_DARK: "#1b262c"
};

export const Columns = {
  TITLE: "title",
  DUE_DATE: "dueDate",
  OWNER: "owner"
}

export const Sorts = {
  BOTH: "both",
  ASC: "asc",
  DESC: "desc"
}

export const Themes = {
  LIGHT: "theme-light",
  DARK: "theme-dark"
}

export const DEFAULT_SORTS = {
  [ToDoFields.TITLE]: 0,
  [ToDoFields.DUE_DATE]: 1,
  [ToDoFields.OWNER]: 0,
  [ToDoFields.COLOR]: 0,
};
