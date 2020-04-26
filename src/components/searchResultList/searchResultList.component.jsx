import React from "react";

import "./searchResultList.styles.scss";

const searchResultList = () => {
  const results = [{ header: "owner", records: ["piotr", "maria", "tara"] }];

  return (
    <div className="search-results">
      {results.map((item) => (
        <div className="search-results-group">
          <div className="search-results__header">{item.header}</div>

          <ul className="search-results__records">
            {item.records.map((entry) => (
              <div className="search-results__record">{entry}</div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default searchResultList;
