import * as d3 from "d3";
import moment from "moment";

const MARGIN = { TOP: 30, BOTTOM: 30, LEFT: 50, RIGHT: 30 };
const WIDTH = 400 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

const getFillColor = date => {
  let today = moment();
  let refDate = moment(date);

  if (refDate.isSame(today, "day")) return "#E67E22";
  if (refDate.isBefore(today, "day")) return "#999";
  return "#246068";
}

const getDayAndMonth = date => moment(date).format("D-M");

class BarChart {
  constructor(element) {
    const vis = this;

    vis.svg = d3.select(element)
        .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
        .append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 40)
            .attr("text-anchor", "middle")
            .text("14-day view")

    vis.xAxisGroup = vis.svg
        .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)

    vis.yAxisGroup = vis.svg
        .append("g")
  }

  update(data) {
      const vis = this;
      vis.data = data;

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count === 0 ? 1 : d.count)])
        .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(data.map(d => getDayAndMonth(d.date)))
        .range([0, WIDTH])
        .padding(0.1);

      const xAxis = d3.axisBottom(x);

      const yAxisTicks = y.ticks().filter(tick => Number.isInteger(tick));
      const yAxis = d3.axisLeft(y).tickValues(yAxisTicks).tickFormat(d3.format("d"))

      vis.xAxisGroup.transition().duration(500).call(xAxis);
      vis.yAxisGroup.transition().duration(500).call(yAxis);

      vis.svg.selectAll("rect")
        .data(vis.data)
        .join("rect")
            .transition().duration(500)
              .attr("x", d => x(getDayAndMonth(d.date)))
              .attr("width", x.bandwidth())
              .attr("y", d => y(d.count))
              .attr("height", d => d.count === 0 ? 0 : HEIGHT - y(d.count))
              .attr("fill", d => getFillColor(d.date))
  }
}

export default BarChart;
