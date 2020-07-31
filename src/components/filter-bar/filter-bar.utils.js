import { FILTER_STATUS } from "../../constants/constants";

export const updateActiveFilters = ({globalFilters, filters }) => {
  const globalFiltersStringified = globalFilters.map((filter) =>
    JSON.stringify(filter)
  );
  const filtersWithStatus = filters.map((filter) => {
    if (globalFiltersStringified.includes(JSON.stringify(filter))) {
      return {
        ...filter,
        status: FILTER_STATUS.HIGHLIGHTED,
      };
    } else {
      return {
        ...filter,
        status: FILTER_STATUS.DISABLED,
      };
    }
  });
  return filtersWithStatus;
};

export const clearActiveStatusFromFilters = (filters) => {
  const filtersWithStatus = filters.map((filter) => ({
    ...filter,
    status: FILTER_STATUS.ACTIVE,
  }));

  return filtersWithStatus;
};
