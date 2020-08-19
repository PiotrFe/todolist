import React from "react";
import ChartWrapper from "../chart-wrapper/chart-wrapper.component";
import HorizontalBarChart from "../horizontal-bar-chart/horizontalBarChart"

import "./report.styles.scss";

const ReportSection = () => (
    <ChartWrapper chart={HorizontalBarChart}/>
);

export default ReportSection;