import React from "react";

import "./searchResultList.styles.scss";
import { ActionTypes } from "../../constants/constants";

const SearchResultList = ({ content = [], word, actions }) => {

  console.log(`SEARCH RESULTS: received content ${JSON.stringify(content)}`)
  const regex = new RegExp(`\w*${word}\w*`, "i");
  let results = {};
  let entry;

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

  return (
    <div className="search-results">
      {Object.keys(results).map((key, idx) => (
        <div key={idx} className="search-results-group">
          <div className="search-results__header">{key}</div>

          <ul className="search-results__records">
            {results[key].map((entry, idx) => (
              <div
                key={idx}
                className="search-results__record"
                onClick={() => {
                  actions[ActionTypes.SEARCH]({ header: key, entry });
                }}
              >
                {entry}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
