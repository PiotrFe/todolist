export const formatSearchResults = ({ preview, word, search, filters }) => {
  // input format:
  // [
  //   {
  //     todos: [
  //       {
  //         lists: ["5f119cf3c9aa891a44223cab"],
  //         title: "todo1",
  //         details: "",
  //         owner: "piotr",
  //       },
  //       {
  //         lists: ["5f119cf3c9aa891a44223cab"],
  //         title: "todo2",
  //         details: "",
  //         owner: "piotr",
  //       },
  //     ],
  //     _id: "5f119cf3c9aa891a44223cab",
  //     filters: [],
  //     title: "todo1",
  //     __v: 16,
  //   },
  //   {
  //     todos: [],
  //     _id: "5f119cf9c9aa891a44223cac",
  //     filters: [],
  //     title: "todo2",
  //     __v: 3,
  //   },
  //   { todos: [], _id: "5f1371d49f47b522548b1bd5", title: "todo3", __v: 2 },
  //   { todos: [], _id: "5f184ae68f16a60c24873ee7", title: "todo4", __v: 0 },
  // ];

  const regex = new RegExp(`\w*${word}\w*`, "i");
  let results = {
    all: [],
  };
  let entry, matches;
  let key, value;

  const filterCounter = new Map();

  preview.forEach((item) => {
    for (let todo of item.todos) {
      for (let key in todo) {
        value = todo[key];
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
