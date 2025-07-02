import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`
# Project Recon on War - Figure 4
`
)}

function _tile(Inputs,d3){return(
Inputs.select(
  new Map([
    ["binary", d3.treemapBinary],
    ["squarify", d3.treemapSquarify],
    ["slice-dice", d3.treemapSliceDice],
    ["slice", d3.treemapSlice],
    ["dice", d3.treemapDice]
  ]),
  {label: "Tiling method", value: d3.treemapBinary}
)
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(d3,data,tile,DOM)
{
  // Specify the chart’s dimensions.
  const width = 1154;
  const height = 1154;

  // Specify the color scale.
  const color = d3.scaleOrdinal(data.children.map(d => d.name), d3.schemeTableau10);

  // Compute the layout.
  const root = d3.treemap()
    .tile(tile) // e.g., d3.treemapSquarify
    .size([width, height])
    .padding(1)
    .round(true)
  (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

  // Add a cell for each leaf of the hierarchy.
  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

  // Append a tooltip.
  const format = d3.format(",d");
  leaf.append("title")
      .text(d => `${d.ancestors().reverse().map(d => d.data.name).join(".")}\n${format(d.value)}`);

  // Append a color rectangle. 
  leaf.append("rect")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", 0.6)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0);

  // Append a clipPath to ensure text does not overflow.
  leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      .attr("xlink:href", d => d.leafUid.href);

  // Append multiline text. The last line shows the value and has a specific formatting.
  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
    .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .text(d => d);

  return Object.assign(svg.node(), {scales: {color}});
}


function _data(FileAttachment){return(
FileAttachment("weapons@2.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["weapons@2.json", {url: new URL("./files/00d075a1f51a2c5d4c2158ed7b5674d750c2d38ed9c323ec6d1e08d03e220d2abb5141a94bf317e01679091680169ca7f8ec3abeaa3598649eceb0853cafcca3.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof tile")).define("viewof tile", ["Inputs","d3"], _tile);
  main.variable(observer("tile")).define("tile", ["Generators", "viewof tile"], (G, _) => G.input(_));
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data","tile","DOM"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
