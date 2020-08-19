import * as d3 from "d3";
import { schemeDark2 } from "d3";

const MARGIN = { TOP: 30, BOTTOM: 50, LEFT: 50, RIGHT: 30 };
const WIDTH = 300 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 200 - MARGIN.TOP - MARGIN.BOTTOM;
const BAR = { HEIGHT: 20, MARGIN: 1 };

const data = [

  {
    id: "5f3adfa897cca14338fd1395",
    color: "#F7B801",
    details: "",
    detailsDraft: "",
    detailsVisible: false,
    done: false,
    draft: "",
    dueDate: "2020-08-17T19:51:00.130Z",
    lists: ["5f3adfa197cca14338fd1394"],
    owner: "piotr",
    title: "todo33",
    height: 5
  },
  {
    id: "5f3adfd797cca14338fd1398",
    color: "",
    details: "",
    detailsDraft: "",
    detailsVisible: false,
    done: false,
    draft: "",
    dueDate: "2020-08-17T19:51:48.044Z",
    lists: ["5f3adfa197cca14338fd1394"],
    owner: "mario",
    title: "new",
    height: 10
  },
  {
    id: "5f3adfe797cca14338fd1399",
    color: "",
    details: "",
    detailsDraft: "",
    detailsVisible: false,
    done: false,
    draft: "",
    dueDate: "2020-08-20T00:00:00.000Z",
    lists: ["5f3adfa197cca14338fd1394"],
    owner: "pies",
    title: "new",
    height: 15
  },
  {
    id: "5f3adfe797cca14338fd1399",
    color: "",
    details: "",
    detailsDraft: "",
    detailsVisible: false,
    done: false,
    draft: "",
    dueDate: "2020-08-20T00:00:00.000Z",
    lists: ["5f3adfa197cca14338fd1394"],
    owner: "dupol",
    title: "new",
    height: 20
  },
];

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

    vis.update();
  }

  update() {
    const vis = this;
    vis.data = data;

    const x = d3
        .scaleLinear()
        .domain([
            0, d3.max(vis.data, d => d.height)
        ])
        .range([0, WIDTH]);

    const y = d3
        .scaleBand()
        .domain(vis.data.map(d => d.owner))
        .range([0, HEIGHT])
        .paddingInner(0.1)
        .round(true)

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    console.log(`bandwidth: ${y.bandwidth()}`);

    const bars = vis.svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", 0)
          .attr("y", d => y(d.owner))
          .attr("width", d => x(d.height))
          .attr("height", y.bandwidth())
          .attr("fill", "orange");

    // bars.append("rect")
    //     .attr("width", d => d.height * 10)
    //     .attr("height", BAR.HEIGHT - BAR.MARGIN)
    //     .attr("fill", "orange");
    
  }
}

export default HorizontalBarChart;
