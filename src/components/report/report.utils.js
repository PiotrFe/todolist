import moment from "moment";

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

export const sumItemsForTwoWeekPeriod = (data) => {
  const today = moment();
  let dateArr = [];
  let d;

  for (let i = 5; i >= 0; i--) {
    d = today.clone().subtract(i, "days");
    dateArr.push(d);
  }

  for (let i = 1; i <= 5; i++) {
    d = today.clone().add(i, "days");
    dateArr.push(d);
  }

  const sortedDateObject = dateArr.reduce(
    (acc, item) => {
      d = item.clone().format("YYYY-M-D");
      return ({
        ...acc,
        [d]: 0
      })
    },
    {}
  );

  const countPerDate = data.reduce((acc, { dueDate }) => {
    d = moment(dueDate).format("YYYY-M-D");

    if (d in sortedDateObject) {
      return {
        ...acc,
        [d]: acc[d] > 0 ? (acc[d] += 1) : 1,
      };
    }
    return acc;
  }, sortedDateObject);

  const countPerDateArr = Object.entries(countPerDate).map(([key, val]) => ({
    date: key,
    count: val,
  }));

  return countPerDateArr;
};
