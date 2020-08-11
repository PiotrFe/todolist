import { createSelector } from "reselect";
import {DEFAULT_SORTS as defaultSorts} from "../../constants/constants";

const selectSortsByListID = (state, props) => state.sorts.byID[props.listID];

export const selectSorts = createSelector(
    selectSortsByListID,
    sorts => {
        if (sorts) return sorts
        else return defaultSorts
    }
)