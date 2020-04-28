import React from "react";

import "./searchResultList.styles.scss";
import { ActionTypes } from "../../constants/constants";

const SearchResultList = ({actions}) => {
  const results = [
      { header: "owner", records: ["piotr", "maria", "tara"] },
      { header: "title", records: ["Go skiing", "Go shopping", "Dance"] }
    ];

  return (
    <div className="search-results">
      {results.map((item, idx) => (
        <div key={idx} className="search-results-group">
          <div className="search-results__header">{item.header}</div>

          <ul className="search-results__records">
            {item.records.map((entry, idx) => (
              <div key={idx} className="search-results__record" onClick={() => {
                  actions[ActionTypes.SEARCH]({header: item.header, entry});
              } }>{entry}</div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

}

export default SearchResultList;
