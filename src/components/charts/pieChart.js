import * as d3 from "d3";

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

        vis.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(RADIUS - 10);
        
    }

    update(data) {
        const vis = this;
        vis.data = data;

        vis.color = d3
            .scaleOrdinal()
            .domain(data)
            .range(['orange','grey']);

        vis.arcs = vis.svg
            .selectAll("arc")
            .data(vis.pie(d3.values(vis.data)))
            .enter()
            // .append("g")
            // .attr("class", "arc")
            .append("path")
            .attr("d", vis.arc)
            .attr("fill", (d, i) => vis.color(i))
        
        // vis.arcs
        //     .append("path")
        //     .attr("fill", (d, i) => vis.color(i))
        //     .attr("d", vis.arc)

    }
}

export default PieChart;