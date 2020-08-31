export const sumItemsPerUser = (data) => {
  const obj = data.reduce((acc, { owner }) => {
    if (acc[owner] > 0) {
      return {
        ...acc,
        [owner]: acc[owner] + 1,
      };
    } else {
      return {
        ...acc,
        [owner]: 1,
      };
    }
  }, {});

  return Object.entries(obj).reduce(
    (acc, [owner, items]) => [...acc, { owner, items }],
    []
  );
};

export const sumItemCategories = (data) => {
  const counter = data.reduce(
    (acc, { done }) => {
      if (done) {
        return {
          ...acc,
          done: (acc.done += 1),
        };
      } else {
        return {
          ...acc,
          pending: (acc.pending += 1),
        };
      }
    },
    { done: 0, pending: 0 }
  );

  const returnObj = Object.entries(counter).reduce(
    (acc, [key, val]) => [...acc, { category: key, count: val }],
    []
  );

  return returnObj;
};
