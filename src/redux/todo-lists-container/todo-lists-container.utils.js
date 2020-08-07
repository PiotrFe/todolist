export const updateSorts = (sorts, field, newVal) => {
  const returnObj = {};

  for (let key in sorts) {
    if (key === field) returnObj[key] = newVal;
    else returnObj[key] = 0;
  }

  return returnObj;
};

export const reorderItems = (todoItems, idxFrom, idxTo) => {
  const reorderedArray = [...todoItems];
  const item = reorderedArray.splice(idxFrom, 1)[0];
  reorderedArray.splice(idxTo, 0, item);

  return reorderedArray;
};
