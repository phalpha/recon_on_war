function _1(md){return(
md`# Project Recon on war - Figure 1, Figure 6`
)}

function _tooltip(d3,color){return(
d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '10px')
    .style('background-color', 'white')
    .style('border-radius', '4px')
    .style('-webkit-border-radius', '10px')
    .style('-moz-border-radius', '10px')
    .style('-webkit-box-shadow', '4px 4px 10px rgba(0, 0, 0, 0.4)')
    .style('-moz-box-shadow', '4px 4px 10px rgba(0, 0, 0, 0.4)')
    .style('box-shadow', '4px 4px 10px rgba(0, 0, 0, 0.4)')
    .style('color', color)
    .style('font-family','sans-serif')
    .text('a simple tooltip')
)}

async function _data(FileAttachment,d3)
{
  const text = await FileAttachment("military spending.csv").text();
  return d3.csvParse(text, ({Country, Military_Spending, Percent_Share_of_GDP, Per_Capita}) => ({
    Country: Country,
    Military_Spending: parseFloat(Military_Spending.replace('$', '').replace(',', '')),
    Percent_Share_of_GDP: parseFloat(Percent_Share_of_GDP.replace('$', '').replace(',', '')),
    Per_Capita: parseFloat(Per_Capita.replace('$', '').replace(',', ''))
  }));
}


function _4(html){return(
html `<p> <strong> Highlight countries with Military Spending Based on the Following Sliders: </strong>  </p>`
)}

function _5(html,arbitrary_threshold){return(
html `<p> <strong> Percent Share of GDP Greater than: </strong> ${arbitrary_threshold} </p>`
)}

function _arbitrary_threshold(Inputs,html){return(
Inputs.range([0, 10], {label: html`Percent Share of GDP Greater than:`, step: 1})
)}

function _militarySpending(__query,FileAttachment,invalidation){return(
__query(FileAttachment("military spending.csv"),{from:{table:"military spending"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _8(html,arbitrary_threshold_2){return(
html `<p> <strong> Per Capita Military Spending Greater than: </strong> ${arbitrary_threshold_2} </p>`
)}

function _arbitrary_threshold_2(Inputs,html){return(
Inputs.range([0, 3000], {label: html`Per Capita Military Spending Greater than:`, step: 100})
)}

function _chart(d3,width,data,margin,color,arbitrary_threshold,arbitrary_threshold_2,highlight_color)
{
  const height = 480;
  const arbitrary_padding = 160;
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
  
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Military_Spending)]).nice()
    .range([arbitrary_padding+margin.left, width - margin.right]);
  
  const y = d3.scaleBand()
    .domain(data.map(d => d.Country))
    .range([480 - margin.bottom, margin.top])
    .padding(0.2);
  
  const xAxis = g => g
    .attr('transform', `translate(0,${480 - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 100))
  
  const yAxis = g => g
    .attr("transform", `translate(${arbitrary_padding+margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    
  const yTitle = g => g.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 14)
    .attr("y", 10)
    .attr("transform", `translate(${100+margin.left},0)`)
    .text("Country")
  
  const xTitle = g => g.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 14)
    .attr("x", width/2)
    .attr("y", height-10)
    .text("Military Spending (Millions)")
  
  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", x(0))
      .attr("y", d => y(d.Country))
      .attr("width", d => x(d.Military_Spending) - x(0))
      .attr("height", y.bandwidth())
    .filter(function(d) {
							return d.Percent_Share_of_GDP >= arbitrary_threshold && d.Per_Capita >= arbitrary_threshold_2;
						})

    .attr("fill", highlight_color);

  svg.append('g')
  .call(xAxis);
  
  svg.append('g')
  .call(yAxis);

   svg.call(yTitle);
  svg.call(xTitle);
  return svg.node();
}


function _color(){return(
"#ea5f94"
)}

function _highlight_color(){return(
"#ffd700"
)}

function _d3(require){return(
require("d3@5")
)}

function _margin(){return(
{top: 30, right: 20, bottom: 50, left: 40}
)}

async function _data2(FileAttachment,d3)
{
  const text = await FileAttachment("stanford_companies.csv").text();
  return d3.csvParse(text, ({Company, Funding_Amount, Projects_Sponsored, Projects_Proposed}) => ({
    Company: Company,
    Funding_Amount: parseFloat(Funding_Amount.replace('$', '').replace(',', '')),
    Projects_Sponsored: parseInt(Projects_Sponsored.replace('$', '').replace(',', '')),
    Projects_Proposed: parseInt(Projects_Proposed.replace('$', '').replace(',', ''))
  }));
}


function _chart2(d3,width,data2,margin,color,highlight_color,tooltip)
{
  const height = 480;
  const arbitrary_padding = 160;
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
  
  const x = d3.scaleLinear()
    .domain([0, d3.max(data2, d => d.Funding_Amount)]).nice()
    .range([arbitrary_padding+margin.left, width - margin.right]);
  
  const y = d3.scaleBand()
    .domain(data2.map(d => d.Company))
    .range([480 - margin.bottom, margin.top])
    .padding(0.2);
  
  const xAxis = g => g
    .attr('transform', `translate(0,${480 - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 100))
  
  const yAxis = g => g
    .attr("transform", `translate(${arbitrary_padding+margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    
  const yTitle = g => g.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 14)
    .attr("y", 10)
    .attr("transform", `translate(${100+margin.left},0)`)
    .text("Company Name")
  
  const xTitle = g => g.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 14)
    .attr("x", width/2)
    .attr("y", height-10)
    .text("Funding Awarded Between 2002 and 2023")
  
  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data2)
    .join("rect")
      .attr("x", x(0))
      .attr("y", d => y(d.Company))
      .attr("width", d => x(d.Funding_Amount) - x(0))
      .attr("height", y.bandwidth())
     .on("mouseover", function(d) {
                    d3.select(this).attr("fill", highlight_color);
                    //Get this bar's x/y values, then augment for the tooltip
                    //Get this bar's x/y values, then augment for the tooltip
                    var yPosition =
                        parseFloat(d3.select(this).attr("y")) +
                        y.bandwidth() / 2;
                    var xPosition =
                        parseFloat(d3.select(this).attr("x")) / 2 + width / 2;
                    
                    tooltip
                    .html(
                      `<div> <strong>Projects Sponsored: </strong>${d.Projects_Sponsored}</div><div><strong>Projects Proposed:</strong> ${d.Projects_Proposed}</div>`
                    )
                    .style('visibility', 'visible');
                    //Update the tooltip position and value
                    //d3.select("#tooltip")
                    //    .style("left", xPosition + "px")
                    //    .style("top", yPosition + "px")
                    //    .select("#value")
                    //    .text(d.violation);
                    //Show the tooltip
                    //d3.select("#tooltip").classed("hidden", false);
                })
   .on('mousemove', function () {
          tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
      })
      .on('mouseout', function () {
          tooltip.html(``).style('visibility', 'hidden');
          d3.select(this).transition().attr('fill', color);
      });

  svg.append('g')
  .call(xAxis);
  
  svg.append('g')
  .call(yAxis);

   svg.call(yTitle);
  svg.call(xTitle);
  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["military spending.csv", {url: new URL("./files/70585846ce7bc16f64dd7d4e5095e0d9726d97d5af47bc345447828f3721d3c29062ec4bd698318dc64162a19f2702339b9d410835cf725c66501a192d1fa10a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["stanford_companies.csv", {url: new URL("./files/093762198841a95b28a70fd41ffb12946f8403745ad45aa5ce2cf9ec8f2b9706b1d8f7ec10d4c1c50f2b6f73fa140e47e7929870b0203479597c6119be74660f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("tooltip")).define("tooltip", ["d3","color"], _tooltip);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  main.variable(observer()).define(["html"], _4);
  main.variable(observer()).define(["html","arbitrary_threshold"], _5);
  main.variable(observer("viewof arbitrary_threshold")).define("viewof arbitrary_threshold", ["Inputs","html"], _arbitrary_threshold);
  main.variable(observer("arbitrary_threshold")).define("arbitrary_threshold", ["Generators", "viewof arbitrary_threshold"], (G, _) => G.input(_));
  main.variable(observer("militarySpending")).define("militarySpending", ["__query","FileAttachment","invalidation"], _militarySpending);
  main.variable(observer()).define(["html","arbitrary_threshold_2"], _8);
  main.variable(observer("viewof arbitrary_threshold_2")).define("viewof arbitrary_threshold_2", ["Inputs","html"], _arbitrary_threshold_2);
  main.variable(observer("arbitrary_threshold_2")).define("arbitrary_threshold_2", ["Generators", "viewof arbitrary_threshold_2"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","data","margin","color","arbitrary_threshold","arbitrary_threshold_2","highlight_color"], _chart);
  main.variable(observer("color")).define("color", _color);
  main.variable(observer("highlight_color")).define("highlight_color", _highlight_color);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("data2")).define("data2", ["FileAttachment","d3"], _data2);
  main.variable(observer("chart2")).define("chart2", ["d3","width","data2","margin","color","highlight_color","tooltip"], _chart2);
  return main;
}
