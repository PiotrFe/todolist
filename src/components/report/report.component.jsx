import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChartWrapper from "../chart-wrapper/chart-wrapper.component";
import HorizontalBarChart from "../charts/horizontalBarChart";
import PieChart from "../charts/pieChart";

import { selectToDos } from "../../redux/todo-item/todo-item.selectors";
import { Dropdown } from "rsuite";

import { sumItemsPerUser, sumItemCategories } from "./report.utils";

import "./report.styles.scss";

const ReportSection = ({ todos }) => {
  const [activeName, updateActiveName] = useState(null);
  const [filteredItems, updateFilteredItems] = useState(null);

  useEffect(() => {
    updateFilteredItems(Object.values(todos));
  },[JSON.stringify(todos)]);

  useEffect(() => {
    const ownerItems = Object.values(todos).filter(item => item.owner === activeName);
    updateFilteredItems(ownerItems);
  }, [activeName])

  const items = Object.values(todos);
  const nameCounter = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.owner]: acc[item.owner] ? (acc[item.owner] += 1) : 1,
    }),
    {}
  );
  const nameList = Object.keys(nameCounter).sort();

  const dropDown = (
    <Dropdown title="Default">
      {nameList.map((name, idx) => (
        <Dropdown.Item
          eventKey={idx}
          onSelect={() => updateActiveName(nameList[idx])}
        >
          {name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );

  return (
    <div className="report">
      {filteredItems?.length ? (
        <>
          {dropDown}
          {activeName}
          <ChartWrapper chart={PieChart} data={sumItemCategories(filteredItems)} />
          <ChartWrapper
            chart={HorizontalBarChart}
            data={sumItemsPerUser(filteredItems)}
          />
        </>
      ) : (
        <div>No data to report</div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  todos: selectToDos,
});

export default connect(mapStateToProps)(ReportSection);
