// Exercise 4.2: D3 Manipulations

// Step 2: Apply style to html element using D3
// d3.select("#d3-target-header")
//     .style("color", "#007BFF")
//     .style("font-size", "2.2rem")
//     .text("Header Styled via D3");

// Step 3: Append a paragraph element using D3
// d3.select("#d3-text-container")
//     .append("p")
//     .style("margin-top", "15px")
//     .style("font-weight", "600")
//     .style("color", "#2d3748")
//     .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append a rectangle to the SVG using D3
// const svgCanvas = d3.select("#d3-svg-playground svg");

// svgCanvas.append("rect")
//     .attr("x", 125)        // Positioning
//     .attr("y", 45)         // Positioning
//     .attr("width", 150)    // Size
//     .attr("height", 60)    // Size
//     .attr("rx", 10)        // Rounded corners
//     .style("fill", "#F3C052") // Navy/Gold Theme
//     .style("stroke", "#003366")
//     .style("stroke-width", "3px");

// Exercise 4.3: D3 Setup & Test Rectangle

// Create svg object within the responsive div
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 900 1600") // Coordinate system: 800 wide by 1600 high 
      .style("border", "1px solid black"); // Boundary marker 

// Add a test svg rectangle
// svg.append("rect")
//     .attr("x", 10)           // Horizontal position 
//     .attr("y", 10)           // Vertical position
//     .attr("width", 414)      // Width attribute 
//     .attr("height", 16)      // Height attribute 
//     .attr("fill", "blue");   // Color attribute 

// Exercise 4.4: Loading and Formatting Data

// Load the data from your CSV file
// Replace 'TV_data.csv' with your specific summary filename if different
d3.csv("./data/TV_data.csv", d => {
    // 1. Initial cleaning (trim and uppercase)
    let rawBrand = d.Brand_Reg ? d.Brand_Reg.trim().toUpperCase() : "UNKNOWN";

    // 2. Check for Samsung variations
    // This looks for "SAMSUNG ELECTRONICS", "SAMSUNG ", etc.
    if (rawBrand.includes("SAMSUNG")) {
        rawBrand = "SAMSUNG";
    }

    return {
        brand: rawBrand,
        consumption: +d['Labelled energy consumption (kWh/year)'],
    };
}).then(data => { 
    // changed rawData to data to match the parameter above
    const brandAverages = d3.groups(data, d => d.brand)
        .map(([brand, models]) => {
            return {
                brand: brand,
                avgConsumption: d3.mean(models, d => d.consumption)
            };
        })
        .filter(d => d.brand !== "UNKNOWN" && d.avgConsumption > 0);

    // Sort by average consumption
    brandAverages.sort((a, b) => d3.descending(a.avgConsumption, b.avgConsumption));

    createBarChart(brandAverages);
});

// Exercises 4.5, 4.6 & 4.7: Binding, Scaling & Labelling
const createBarChart = (data) => {

    // Increase the margin to 300px to ensure long brand names fit
    const labelMargin = 300;
    
    // 1. Define scales
    // Linear scale maps energy values to the 500px width of our SVG.
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgConsumption)]) 
        .range([0, 500]); 

    // Band scale distributes the brands along the 1600px height.
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) 
        .range([0, 1600]) 
        .padding(0.1); // Adds a 20% gap between bars for readability.

    // 2. Create group containers
    // Select all groups, bind data, and move the group to the correct Y position
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // 3. Append rectangles to groups
    barAndLabel
        .append("rect")
        .attr("class", d => `bar bar-${d.avgConsumption}`)
        .attr("x", labelMargin) // Start bars at the 200px mark
        .attr("y", 0)
        .attr("width", d => xScale(d.avgConsumption)) 
        .attr("height", yScale.bandwidth()) 
        .attr("fill", "blue");

    // 4. Add category text (Brand Names)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        // Position exactly at the start of the bar
        .attr("x", labelMargin - 15) // 15px gap between text and bar
        .attr("y", yScale.bandwidth() / 2 + 5) 
        .attr("text-anchor", "end") // Pulls text to the left
        .style("font-family", "serif")
        .style("font-size", "11px");

    // 5. Add Average Consumption Labels (Right Side)
    barAndLabel
        .append("text")
        // Round the average to 1 decimal place for neatness
        .text(d => d.avgConsumption.toFixed(1))
        .attr("x", d => labelMargin + xScale(d.avgConsumption) + 10)
        .attr("y", yScale.bandwidth() / 2 + 5)
        .attr("text-anchor", "start")
        .style("font-family", "serif")
        .style("font-size", "11px")
        .style("fill", "darkblue");
};