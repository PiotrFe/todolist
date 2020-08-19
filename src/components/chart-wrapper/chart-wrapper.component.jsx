import React, { useRef, useState, useEffect } from "react";
import "./chart-wrapper.styles.scss";

const ChartWrapper = ({chart: passedChart}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) setChart(new passedChart(chartArea.current));
    // if (chart.data) chart.update();
  }, [chart]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
