import { createSelector } from "reselect";

const authSelector = state => state.auth;

export const selectAuthStatus = createSelector(
    authSelector,
    auth => auth?.authenticated
)