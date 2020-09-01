import * as d3 from "d3";
import moment from "moment";

const MARGIN = { TOP: 30, BOTTOM: 30, LEFT: 50, RIGHT: 30 };
const WIDTH = 350 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM;

const getFillColor = date => {
  let today = moment();
  let refDate = moment(date);
  
  if (refDate.isBefore(today)) return "red"
  else return "orange";
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
        .domain([0, d3.max(data, d => d.count)])
        .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(data.map(d => getDayAndMonth(d.date)))
        .range([0, WIDTH])
        .padding(0.1);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y).ticks(5);

      vis.xAxisGroup.transition().duration(500).call(xAxis);
      vis.yAxisGroup.transition().duration(500).call(yAxis);

      vis.svg.selectAll("rect")
        .data(vis.data)
        .join("rect")
            .transition().duration(500)
              .attr("x", d => x(getDayAndMonth(d.date)))
              .attr("width", x.bandwidth())
              .attr("y", d => y(d.count))
              .attr("height", d => HEIGHT - y(d.count))
              .attr("fill", d => getFillColor(d.date))
  }
}

export default BarChart;
