import React, { useRef, useState, useEffect } from "react";
import "./chart-wrapper.styles.scss";

const localData = [
  { owner: "piotr", items: 3 },
  { owner: "mario", items: 2 },
];

const ChartWrapper = ({chart: passedChart, data}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) setChart(new passedChart(chartArea.current));
  }, [chart]);

  useEffect(() => {
    if (chart && data) chart.update(data);
  },[chart, JSON.stringify(data)])

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
