// Histogram Drawing Function

function drawHistogram(data) {
    // 1. Flush duplicate historical elements to clear the canvas node area
    d3.select("#histogram-chart").selectAll("svg").remove();

    // 2. Build root SVG container element using viewBox scaling configurations
    const svg = d3.select("#histogram-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 3. Append drawing workspace matrix shifted past padding margins
    const chartGroup = svg.append("g")
        .attr("id", "chart-core-group")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 4. Calculate absolute minimum and maximum data limits to bind xScale domain bounds
    xScale.domain([0, d3.max(data, d => d.energyConsumption)]).nice();

    // 5. Connect scale domain bounds to bin generator and slice the records array
    binGenerator.domain(xScale.domain());
    const initialBins = binGenerator(data);

    // 6. Adjust vertical scale peaks based on the highest frequency bin array element count
    yScale.domain([0, d3.max(initialBins, d => d.length)]).nice();

    // 7. Build visual axes vectors
    chartGroup.append("g")
        .attr("class", "histogram-axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(8));

    chartGroup.append("g")
        .attr("class", "histogram-axis y-axis")
        .call(d3.axisLeft(yScale).ticks(6));

    // 8. Draw the default startup "ALL" bars into the view layout
    chartGroup.selectAll(".bar")
        .data(initialBins)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0)) // Set left edge position relative to bin lower boundary
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0))) // Calculate total box thickness range
        .attr("y", d => yScale(d.length)) // Position top edge vertical height location scale mapping
        .attr("height", d => innerHeight - yScale(d.length)) // Structural vector node height dimension metrics
        .attr("fill", barFillColor)
        .attr("stroke", bodyBackgroundColor) // Uses configuration color background token to carve visible block separations
        .attr("stroke-width", "1.5px");

    // 9. Attach Static Horizontal Label Track Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-family", "sans-serif")
        .style("fill", "#475569")
        .style("font-weight", "600")
        .text("Annual Energy Consumption Load Profile (kWh/year)");

    // 10. Attach Vertical Frequency Y-Axis Label
    // Rotates the text 90 degrees counter-clockwise and places it neatly left of the ticks
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left - 45) // Adjusts the distance from the left edge of the chart card box area
        .attr("x", -(margin.top + innerHeight / 2)) // Pinpoints the center point vertically
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-family", "sans-serif")
        .style("fill", "#475569")
        .style("font-weight", "600")
        .text("Frequency (Count)");
}