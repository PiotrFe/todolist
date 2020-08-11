export const updateSorts = (sorts, field) => {
  const returnObj = { ...sorts };
  for (let key in returnObj) {
    if (key === field) {
      switch (returnObj[field]) {
        case 0:
          returnObj[field] = 1;
          break;
        case 1:
          returnObj[field] = -1;
          break;
        case -1:
          returnObj[field] = 0;
          break;
        default:
          break;
      }
    } else {
      returnObj[key] = 0;
    }
  }
  return returnObj;
};
