import Icon from "./icon.component"

export const IconTypes = {
    ADD: "add",
    BACKSPACE: "backspace",
    DONE: "done",
    EDIT: "edit",
    HOME: "home",
    REMOVE: "remove",
    SEARCH: "search",
    SORT_BOTH: "sort-both",
    SORT_DESC: "sort-down",
    SORT_ASC: "sort-up",
    SUBMIT: "submit",
    TOGGLE_DETAILS: "toggle-details",
    UPDATE: "update"


}

export const IconClasses = {
    [IconTypes.ADD]: "fas fa-plus",
    [IconTypes.BACKSPACE]: "fas fa-backspace",
    [IconTypes.DONE]: "fas fa-check",
    [IconTypes.EDIT]: "fas fa-pen",
    [IconTypes.HOME]: "fas fa-home",
    [IconTypes.REMOVE]: "fas fa-trash",
    [IconTypes.SEARCH]: "fas fa-search",
    [IconTypes.SORT_BOTH]: "fas fa-sort",
    [IconTypes.SORT_ASC]: "fas fa-sort-down",
    [IconTypes.SORT_DESC]: "fas fa-sort-up",
    [IconTypes.TOGGLE_DETAILS]: "fas fa-sync-alt"
}