// Scatter Plot
{
    // 1. Define canvases boundaries (D3 Margin Convention)
    // Allocates fixed padding around the graph to secure space for axes labels
    const margin = { top: 20, right: 20, bottom: 45, left: 55 };
    const width = 600 - margin.left - margin.right;  // Working inner canvas width
    const height = 350 - margin.top - margin.bottom; // Working inner canvas height

    // 2. Initialize element hook & inner shift component
    const svg = d3.select("#scatter-container")
        .append("svg")
        .attr("viewBox", "0 0 600 350") // Sets responsive fluid viewBox scaling rules
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // Shifts coordinates to inner margin origin

    // 3. Load data from source asynchronously
    d3.csv("./data/Ex5_TV_energy.csv", d => {
        // Row converter: forces string row metrics into standard Javascript numbers (+)
        return {
            stars: +d.star2,
            energy: +d.energy_consumpt
        };
    }).then(data => {
        // Clean dataset: remove any unrated models or empty data cells
        const cleaned = data.filter(d => d.stars > 0 && d.energy > 0 && d.energy < 2500);

        // 4. Declare coordinate scaling interpreters
        // scaleLinear maps abstract mathematical numeric values uniformly onto pixel lengths
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(cleaned, d => d.stars)]).nice() // .nice() rounds domain limits cleanly
            .range([0, width]); // Maps left edge to right edge of width pixel workspace

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleaned, d => d.energy)]).nice()
            .range([height, 0]); // Inverted range: SVG vertical coordinates grow from top to bottom

        // 5. Draw graph grid axels
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`) // Moves X-Axis to the absolute bottom of workspace
            .call(d3.axisBottom(xScale).ticks(7));

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale).ticks(6));

        // 6. Execute element join loop (Circles)
        svg.selectAll("circle")
            .data(cleaned)
            .join("circle") // Binds each row entry to an SVG circle vector element
            .attr("cx", d => xScale(d.stars))       // Maps custom horizontal center point
            .attr("cy", d => yScale(d.energy))      // Maps custom vertical center point
            .attr("r", 3.5)                         // Dot radius size
            .attr("fill", "#007BFF")              // Action electric blue theme
            .attr("opacity", 0.4);                  // Opacity overlap highlights data clusters

        // 7. Labeling
        // Horizontal X-Axis Label (Centered at the absolute bottom)
        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + 35) // Drops it cleanly below the axis tick values
            .attr("text-anchor", "middle") 
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("fill", "#475569")
            .style("font-weight", "600")
            .text("Labeled Star Rating");

        // Vertical Y-Axis Label (Rotated on the left side)
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)") 
            .attr("y", -40) // Shifts it left, outside the numbering area
            .attr("x", -height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("fill", "#475569")
            .style("font-weight", "600")
            .text("Labeled Energy Consumption (kWh/year)");
    });
}