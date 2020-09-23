import React, { useRef, useState, useEffect } from "react";
import "./chart-wrapper.styles.scss";

const ChartWrapper = ({ chart: passedChart, data }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) setChart(new passedChart(chartArea.current));
  }, [chart, passedChart]);

  useEffect(() => {
    if (chart && data) chart.update(data);
  }, [chart, JSON.stringify(data)]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
