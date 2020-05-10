import React from "react";

import "./searchResultList.styles.scss";
import { ActionTypes } from "../../constants/constants";

const SearchResultList = ({ content = [], word, actions }) => {
  // incoming format: [{key: value}], e.g. [{owner: "peter"},{owner: "peter kowalski"}, {details: "peter did smth"}];
  const regex = new RegExp(`\w*${word}\w*`, "ig");
  let results = {};
  let entry, matches;

  content.forEach((item) => {
    for (let key in item) {
      entry = item[key];

      if (regex.test(entry)) {
        if (key in results && !results[key].includes(entry)) {
          results[key].push(entry);
        } else {
          results[key] = [entry];
        }
      }
    }
  });
  // resulting format: {owner: ["peter", "peter kowalski"], details: ["peter did smth"]}

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

   // resulting format: {owner: [{text: "peter", formattedText: "<span>peter</span>"}]}

  return (
    <div className="search-results">
      {Object.keys(formattedResults).map((key, idx) => (
        <div key={idx} className="search-results-group">
          <div className="search-results__header">{key}</div>

          <ul className="search-results__records">
            {formattedResults[key].map((entry, idx) => (
              <div
                key={idx}
                className="search-results__record"
                onClick={() => {
                  actions[ActionTypes.SEARCH]({ [key]: entry.text });
                }}
              >
                {" "}
                <div
                  className="search-results__record"
                  dangerouslySetInnerHTML={{
                    __html: entry.formattedText
                  }}
                ></div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
