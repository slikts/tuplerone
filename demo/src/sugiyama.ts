import * as d3 from "d3";
import * as d3dag from "d3-dag";

// ----- //
// Setup //
// ----- //

/**
 * get transform for arrow rendering
 *
 * This transform takes anything with points (a graph link) and returns a
 * transform that puts an arrow on the last point, aligned based off of the
 * second to last.
 */
function arrowTransform({
  points
}: {
  points: readonly (readonly [number, number])[];
}): string {
  const [[x1, y1], [x2, y2]] = points.slice(-2);
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 90;
  return `translate(${x2}, ${y2}) rotate(${angle})`;
}

// our raw data to render
const data = [
  {
    "id": "0"
  },
  {
    "id": "1",
    "parentIds": ["0"]
  },
  {
    "id": "2"
  },
  {
    "id": "3",
    "parentIds": ["1", "2"]
  },
  {
    "id": "4",
    "parentIds": ["3"]
  },
  {
    "id": "5",
    "parentIds": ["3"]
  },
  {
    "id": "6",
    "parentIds": ["5"]
  }
]

// create our builder and turn the raw data into a graph
const builder = d3dag.graphStratify();
const graph = builder(data);

// -------------- //
// Compute Layout //
// -------------- //

// set the layout functions
const nodeRadius = 20;
const nodeSize = [nodeRadius * 2, nodeRadius * 2] as const;
// this truncates the edges so we can render arrows nicely
const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);
// use this to render our edges
const line = d3.line().curve(d3.curveMonotoneY);
// here's the layout operator, uncomment some of the settings
const layout = d3dag
  .sugiyama()
  //.layering(d3dag.layeringLongestPath())
  //.decross(d3dag.decrossOpt())
  //.coord(d3dag.coordGreedy())
  //.coord(d3dag.coordQuad())
  .nodeSize(nodeSize)
  .gap([nodeRadius, nodeRadius])
  .tweaks([shape]);

// actually perform the layout and get the final size
const { width, height } = layout(graph);

// --------- //
// Rendering //
// --------- //

// colors
const steps = graph.nnodes() - 1;
const interp = d3.interpolateRainbow;
const colorMap = new Map(
  [...graph.nodes()]
    .sort((a, b) => a.y - b.y)
    .map((node, i) => [node.data.id, interp(i / steps)])
);

// global
const svg = d3
  .select("#svg")
  // pad a little for link thickness
  .style("width", width + 4)
  .style("height", height + 4);
const trans = svg.transition().duration(750);

// nodes
svg
  .select("#nodes")
  .selectAll("g")
  .data(graph.nodes())
  .join((enter) =>
    enter
      .append("g")
      .attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
      .attr("opacity", 0)
      .call((enter) => {
        enter
          .append("circle")
          .attr("r", nodeRadius)
          .attr("fill", (n) => colorMap.get(n.data.id)!);
        enter
          .append("text")
          .text((d) => d.data.id)
          .attr("font-weight", "bold")
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("fill", "white");
        enter.transition(trans).attr("opacity", 1);
      })
  );

// link gradients
svg
  .select("#defs")
  .selectAll("linearGradient")
  .data(graph.links())
  .join((enter) =>
    enter
      .append("linearGradient")
      .attr("id", ({ source, target }) =>
        encodeURIComponent(`${source.data.id}--${target.data.id}`)
      )
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", ({ points }) => points[0][0])
      .attr("x2", ({ points }) => points[points.length - 1][0])
      .attr("y1", ({ points }) => points[0][1])
      .attr("y2", ({ points }) => points[points.length - 1][1])
      .call((enter) => {
        enter
          .append("stop")
          .attr("class", "grad-start")
          .attr("offset", "0%")
          .attr("stop-color", ({ source }) => colorMap.get(source.data.id)!);
        enter
          .append("stop")
          .attr("class", "grad-stop")
          .attr("offset", "100%")
          .attr("stop-color", ({ target }) => colorMap.get(target.data.id)!);
      })
  );

// link paths
svg
  .select("#links")
  .selectAll("path")
  .data(graph.links())
  .join((enter) =>
    enter
      .append("path")
      .attr("d", ({ points }) => line(points))
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr(
        "stroke",
        ({ source, target }) => `url(#${source.data.id}--${target.data.id})`
      )
      .attr("opacity", 0)
      .call((enter) => enter.transition(trans).attr("opacity", 1))
  );

// Arrows
const arrowSize = 80;
const arrowLen = Math.sqrt((4 * arrowSize) / Math.sqrt(3));
const arrow = d3.symbol().type(d3.symbolTriangle).size(arrowSize);
svg
  .select("#arrows")
  .selectAll("path")
  .data(graph.links())
  .join((enter) =>
    enter
      .append("path")
      .attr("d", arrow)
      .attr("fill", ({ target }) => colorMap.get(target.data.id)!)
      .attr("transform", arrowTransform)
      .attr("opacity", 0)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      // use this to put a white boundary on the tip of the arrow
      .attr("stroke-dasharray", `${arrowLen},${arrowLen}`)
      .call((enter) => enter.transition(trans).attr("opacity", 1))
  );
