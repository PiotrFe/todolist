import * as d3 from "d3";

const MARGIN = { TOP: 30, BOTTOM: 50, LEFT: 50, RIGHT: 30 };
const WIDTH = 300 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 200 - MARGIN.TOP - MARGIN.BOTTOM;


class HorizontalBarChart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
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
        .text("Items per user");

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");
  }

  update(data) {
    const vis = this;
    vis.data = data;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(vis.data, (d) => d.items)])
      .range([0, WIDTH])

    const y = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.owner))
      .range([0, HEIGHT])
      .padding(0.1);

    const xAxisCall = d3.axisBottom(x).ticks(5);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    const bars = vis.svg
      .selectAll("rect")
      .data(vis.data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.owner))
      .attr("width", (d) => x(d.items))
      .attr("height", y.bandwidth())
      .attr("fill", "orange");
  }
}

export default HorizontalBarChart;
