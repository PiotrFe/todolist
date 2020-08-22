import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChartWrapper from "../chart-wrapper/chart-wrapper.component";
import HorizontalBarChart from "../charts/horizontalBarChart";
import PieChart from "../charts/pieChart";

import { selectToDos } from "../../redux/todo-item/todo-item.selectors";

import { sumItemsPerUser, sumItemCategories } from "./report.utils";

import "./report.styles.scss";

const ReportSection = ({ todos }) => {
  const items = Object.values(todos);

  return (
    <div className="report">
      {items.length ? (
        <>
          <ChartWrapper chart={PieChart} data={sumItemCategories(items)} />
          <ChartWrapper
            chart={HorizontalBarChart}
            data={sumItemsPerUser(items)}
          />
        </>
      ) : <div>No data to report</div>}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  todos: selectToDos,
});

export default connect(mapStateToProps)(ReportSection);
