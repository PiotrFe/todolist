import React from "react";
import { Loader } from "rsuite";

import { formatSearchResults } from "./searchResultList.utils";

import "./searchResultList.styles.scss";

const SearchResultList = ({ preview = [], word, search, filters, loading }) => {
  let formattedResults;
  let noResultsMessage = "Not found";

  if (preview.length > 0) {
    formattedResults = formatSearchResults({ preview, word, search, filters });
  } 

  console.log(`---------------
  ${JSON.stringify(preview)}
  --------------`)

  return (
    <div className="search-results-container">
      <div className="search-results">
        {preview.length > 0 &&
          preview[0] !== noResultsMessage &&
          Object.keys(formattedResults).map((key, idx) => (
            <div key={idx} className="search-results-group">
              <div
                className={`search-results__header ${
                  key === "all" ? "search-results__header--all" : null
                }`}
              >
                {key}
              </div>
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

        <div>
          {(!loading && preview.length === 0) && "No results"}
          {loading && (
            <div>
              <Loader /> LOADING..
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultList;
