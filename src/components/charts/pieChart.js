import * as d3 from "d3";
import { arc } from "d3";

// const MARGIN = { TOP: 30, BOTTOM: 30, LEFT: 30, RIGHT: 30 };
const MARGIN = 15;
const WIDTH = 230 - MARGIN;
const HEIGHT = 230 - MARGIN;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

class PieChart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN)
      .attr("height", HEIGHT + MARGIN)
      .append("g")
      .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

    vis.xLabel = vis.svg
      .append("text")
      .attr("x", WIDTH / 2 - 100)
      .attr("y", HEIGHT / 2 + 10)
      .attr("text-anchor", "middle")
      .text("done vs pending");

    vis.pie = d3.pie();

    vis.arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(RADIUS - 10);

    vis.label = d3
      .arc()
      .innerRadius(RADIUS - 80)
      .outerRadius(RADIUS);
  }

  update(data) {
    const vis = this;
    vis.data = data;

    vis.color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(["orange", "grey"]);
    const t = d3.transition().duration(500);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.count);

    const arcs = pie(vis.data);

    vis.svg.append("g")
        .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join(
        enter => enter.append("path")
        .call(enter => enter.transition(t)
          .attr("fill", (d, i) => vis.color(i))
          .attr("d", vis.arc)),
        update => update.call(update => update.transition(t)
          .attr("fill", (d, i) => vis.color(i))
          .attr("d", vis.arc)),
        exit => exit.call(exit => exit.transition(t)
          .remove())
    )

    vis.svg.append("g")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${vis.label.centroid(d)})`)
        .call(text => text.append("tspan")
          .attr("y", "-0.2rem")
          .text(d => `${d.data.category} ${d.data.count}`))
     
  }
}

export default PieChart;
