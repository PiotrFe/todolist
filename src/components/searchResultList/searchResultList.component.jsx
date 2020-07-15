import React from "react";

import "./searchResultList.styles.scss";
import { ActionTypes } from "../../constants/constants";

const SearchResultList = ({ preview = [], word, search, filters }) => {
  // incoming format: [{key: value}], e.g.
  // [{"title":"teraz dziala","details":"","owner":"piotr"},{"title":"bum","details":"","owner":"piotr"},{"title":"mysh","details":"","owner":"piotr"},{"title":"mysh","details":"piotr","owner":"mario"}]

  const regex = new RegExp(`\w*${word}\w*`, "i");
  let results = {
    all: []
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
          (filter) => JSON.stringify({[key]: value}) === JSON.stringify(filter)
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
          <div className={`search-results__header ${key === "all" ? "search-results__header--all" : null}`}>{key}</div>
          <ul className="search-results__records">
            {formattedResults[key].map((entry, idx) => (
              <div
                key={idx}
                className="search-results__record"
                onClick={() => {
                  search({ [key]: entry.text });
                }}
              >
                {" "}
                <div
                  className="search-results__record"
                  dangerouslySetInnerHTML={{
                    __html: entry.formattedText,
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
