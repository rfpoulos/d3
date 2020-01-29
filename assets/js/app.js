// @TODO: YOUR CODE HERE!
const margin = {top: 10, right: 30, bottom: 30, left: 60};
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
  


		  
d3.csv("./assets/data/data.csv", (datum) => datum)
	.then((data) => {
		generatePlot("#age", data, "age")
		generatePlot("#income", data, "income")
	})

const generatePlot = (selector, data, xField) => {
	const svg = d3.select(selector)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("text")             
		.attr("transform",
			  "translate(" + (width/2) + " ," + 
							 (height + margin.top + 20) + ")")
		.style("text-anchor", "middle")
		.text(xField.toUpperCase());

	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Healthcare");      
  

	const xValues = data.map(datum => Number(datum[xField]));
	const xMax = Math.max(...xValues);

	const x = d3.scaleLinear()
		.domain([0, xMax * 1.1])
		.range([ 0, width ]);

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	const yValues = data.map(datum => Number(datum.healthcare));
	const yMax = Math.max(...yValues);
	
	const y = d3.scaleLinear()
		.domain([0, yMax * 1.1])
		.range([ height, 0]);

	svg.append("g")
		.call(d3.axisLeft(y));

	svg.append("g")
		.selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", (d) => x(Number(d[xField])))
		.attr("cy", (d) => y(Number(d.healthcare)))
		.attr("r", 5)
		.style("fill", "#69b3a2")
		.append("title")
		.text(d => d.state)
}
