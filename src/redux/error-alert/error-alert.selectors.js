import { createSelector } from "reselect";

const errors = (state) => state.errors;

export const selectErrors = createSelector(
    [errors], 
    (errors) =>  errors
);
