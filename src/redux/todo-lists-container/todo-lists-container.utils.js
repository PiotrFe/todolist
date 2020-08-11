

export const reorderItems = (todoItems, idxFrom, idxTo) => {
  const reorderedArray = [...todoItems];
  const item = reorderedArray.splice(idxFrom, 1)[0];
  reorderedArray.splice(idxTo, 0, item);

  return reorderedArray;
};
