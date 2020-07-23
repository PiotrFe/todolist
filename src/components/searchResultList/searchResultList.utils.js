export const formatSearchResults = ({ preview, word, search, filters }) => {
  // input format: [{key: value}], e.g.
  // [{"title":"teraz dziala","details":"","owner":"piotr"},{"title":"bum","details":"","owner":"piotr"},{"title":"mysh","details":"","owner":"piotr"},{"title":"mysh","details":"piotr","owner":"mario"}]
  const regex = new RegExp(`\w*${word}\w*`, "i");
  let results = {
    all: [],
  };
  let entry, matches;
  let key, value;

  const filterCounter = new Map();

  preview.forEach((item) => {
    for (let key in item) {
      value = item[key];
      if (
        regex.test(value) &&
        !filters.some(
          (filter) =>
            JSON.stringify({ [key]: value }) === JSON.stringify(filter)
        )
      ) {
        if (key in results && !results[key].includes(value)) {
          results[key].push(value);
        }
        if (!(key in results)) {
          results[key] = [value];
        }
        if (!results["all"].includes(value)) {
          results["all"].push(value);
        }
      }
    }
  });
  // output format: {owner: ["peter", "peter kowalski"], details: ["peter did smth"]}

  const formattedResults = {};
  let htmlNode;

  Object.keys(results).forEach((key) => {
    Object.assign(formattedResults, { [key]: [] });

    results[key].forEach((entry) => {
      formattedResults[key].push({
        text: entry,
        formattedText: entry.replace(
          new RegExp(word, "g"),
          `<span>${word}</span>`
        ),
      });
    });
  });

  // output format: {owner: [{text: "peter", formattedText: "<span>peter</span>"}]}

  return formattedResults;
};
