export const filterToDos = ({ mainSet = [], subSet = [] }) => {
    if (mainSet.length === 0 || subSet.length === 0) return mainSet;
  
    const subSetIDs = subSet.map(({ _id }) => _id);
  
    return mainSet.filter((item) => subSetIDs.includes(item._id));
  };