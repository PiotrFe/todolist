import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChartWrapper from "../chart-wrapper/chart-wrapper.component";
import HorizontalBarChart from "../charts/horizontalBarChart";
import PieChart from "../charts/pieChart";
import BarChart from "../charts/barChart";

import { selectToDos } from "../../redux/todo-item/todo-item.selectors";
import { Dropdown, CheckPicker } from "rsuite";

import { sumItemsPerUser, sumItemCategories } from "./report.utils";

import "./report.styles.scss";

const data = [
  { date: "20-8", count: 4 },
  { date: "21-8", count: 3 },
  { date: "22-8", count: 6 },
  { date: "23-8", count: 1 },
  { date: "24-8", count: 10 },
  { date: "25-8", count: 3 },
  { date: "26-8", count: 4 },
  { date: "27-8", count: 5 },
  { date: "28-8", count: 5 }
]


const ReportSection = ({ todos }) => {
  const [activeNames, updateActiveNames] = useState(null);
  const [fullNameList, updateFullNameList] = useState(null);
  const [nameLabels, updateNameLabels] = useState(null);
  const [filteredItems, updateFilteredItems] = useState(null);
  const [checkPicker, updateCheckPicker] = useState(null);

  useEffect(() => {
    if (Object.keys(todos).length === 0) return;

    const items = Object.values(todos);
    const nameCounter = items.reduce(
      (acc, item) => ({
        ...acc,
        [item.owner]: acc[item.owner] ? (acc[item.owner] += 1) : 1,
      }),
      {}
    );
    const nameList = Object.keys(nameCounter).sort();
    const nameLabels = Object.keys(nameCounter)
      .sort()
      .map((name) => ({
        label: name,
        value: name,
      }));

    updateFullNameList(nameList);
    updateActiveNames(nameList);
    updateNameLabels(nameLabels);
  }, [todos]);

  useEffect(() => {
    if (fullNameList?.length && nameLabels?.length) {
      const checkPicker = (
        <CheckPicker
          data={nameLabels}
          onSelect={(value, item, event) => updateActiveNames(value)}
          onClean={() => updateActiveNames(fullNameList)}
        ></CheckPicker>
      );

      updateCheckPicker(checkPicker);
    }
  }, [fullNameList, nameLabels]);

  useEffect(() => {
    updateFilteredItems(Object.values(todos));
  }, [JSON.stringify(todos)]);

  useEffect(() => {
    const filteredItems = Object.values(todos).filter((item) =>
      activeNames?.includes(item.owner)
    );
    updateFilteredItems(filteredItems);
  }, [activeNames]);

  return (
    <div className="report">
      {filteredItems?.length ? (
        <>
          {checkPicker}
          <ChartWrapper
            chart={PieChart}
            data={sumItemCategories(filteredItems)}
          />
          <ChartWrapper
            chart={HorizontalBarChart}
            data={sumItemsPerUser(filteredItems)}
          />
          <ChartWrapper
            chart={BarChart}
            data={data}
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
