export const generateCVSData = ({ localView, title }) => {
  const fieldsToExclude = [
    "lists",
    "_id",
    "color",
    "editMode",
    "detailsVisible",
    "__v",
  ];

  if (localView.length === 0) {
    alert(
      `No items visible in list ${title}.
Add items or remote filters and try again`
    );
    return;
  }

  let headers = Object.keys(localView[0])
    .filter((key) => !fieldsToExclude.includes(key))
    .join()
    .trim()
    .concat(`\n`);

  let values = localView
    .map((item) =>
      Object.entries(item)
        .filter(([key, value]) => !fieldsToExclude.includes(key))
        .map(([key, value]) => value)
    )
    .map(values => `${values.join().trim()}\n`)
    .join("");

  return `${headers}${values}`;
};
