export const filterToDos = ({ mainSet = [], subSet = [] }) => {
    if (mainSet.length === 0 || subSet.length === 0) return mainSet;
  
    return mainSet.filter((id) => subSet.includes(id));
  };