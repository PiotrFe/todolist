import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChartWrapper from "../chart-wrapper/chart-wrapper.component";
import HorizontalBarChart from "../horizontal-bar-chart/horizontalBarChart";

import { selectToDos } from "../../redux/todo-item/todo-item.selectors";

import "./report.styles.scss";

const sumItemsPerUser = (data) => {
  const obj = data.reduce((acc, { owner }) => {
    if (acc[owner] > 0) {
      return {
        ...acc,
        [owner]: acc[owner] + 1,
      };
    } else {
      return {
        ...acc,
        [owner]: 1,
      };
    }
  }, {});

  return Object.entries(obj).reduce(
    (acc, [owner, items]) => [...acc, { owner, items }],
    []
  );
};

const ReportSection = ({ todos }) => (
  <ChartWrapper
    chart={HorizontalBarChart}
    data={sumItemsPerUser(Object.values(todos))}
  />
);

const mapStateToProps = createStructuredSelector({
  todos: selectToDos,
});

export default connect(mapStateToProps)(ReportSection);
