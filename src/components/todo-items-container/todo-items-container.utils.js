

export const generateCVSData = ({ visibleItems, title }) => {
  const fieldsToExclude = [
    "lists",
    "_id",
    "color",
    "editMode",
    "detailsVisible",
    "__v",
  ];


  if (visibleItems.length === 0) {
    alert(
      `No items visible in list ${title}.
Add items or remote filters and try again`
    );
    return;
  }

  let headers = Object.keys(visibleItems[0])
    .filter((key) => !fieldsToExclude.includes(key))
    .join()
    .trim()
    .concat(`\n`);

  let values = visibleItems
    .map((item) =>
      Object.entries(item)
        .filter(([key, value]) => !fieldsToExclude.includes(key))
        .map(([key, value]) => value)
    )
    .map((values) => `${values.join().trim()}\n`)
    .join("");

  return `${headers}${values}`;
};

export const onDrop = (result) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  return {from: source.index, to: destination.index }
};

export const filterToDos = ({ mainSet = [], subSet = [] }) => {
  if (mainSet.length === 0 || subSet.length === 0) return mainSet;

  const subSetIDs = subSet.map(({ _id }) => _id);

  return mainSet.filter((item) => subSetIDs.includes(item._id));
};
