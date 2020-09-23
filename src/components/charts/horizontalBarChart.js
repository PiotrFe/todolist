import * as d3 from "d3";
import { selectAll } from "d3";

const MARGIN = { TOP: 30, BOTTOM: 50, LEFT: 50, RIGHT: 30 };
const WIDTH = 400 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

const sumItems = ({ done, pending }) => done + pending;

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
    /*
    incoming data format: 
    [
      {owner: "john", done: 3, pending: 5},
     {owner: "john", done: 3, pending: 5}
    ]
    */

    const vis = this;
    const names = data.reduce((acc, { owner }) => [...acc, owner], []);

    const stackGen = d3.stack().keys(["done", "pending"]);
    const layers = stackGen(data);

    const extent = [
      0,
      d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1])),
    ];

    const x = d3.scaleLinear().domain(extent).range([0, WIDTH]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.owner))
      .range([0, HEIGHT])
      .padding(0.1);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["done", "pending"])
      .range(["#999", "#246068"]);

    const xAxisCall = d3
      .axisBottom(x)
      .ticks(extent[1])
      .tickFormat(d3.format("d"));
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    const t = d3.transition().duration(500);

    vis.svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => colorScale(layer.key))
      .selectAll("rect")
      .data(layer => layer)
      .join(
        (enter) => enter.append("rect"),
        (update) => update,
        (exit) => exit.transition().duration(500).attr("width", 0).remove()
        )
      .transition()
      .duration(500)
      .attr("y", sequence => y(sequence.data.owner))
      .attr("height", y.bandwidth())
      .attr("x", sequence => x(sequence[0]))
      .attr("width", sequence => x(sequence[1] - sequence[0]))

  }
}

export default HorizontalBarChart;
