// Scatterplot Drawing Function

const drawScatterplot = (data) => {
    // 1. Flush any duplicate historical vector wrappers to clear the workspace container
    d3.select("#interactive-scatter-chart").selectAll("svg").remove();

    // 2. Append base SVG wrapper utilizing responsive viewBox parameters
    const svg = d3.select("#interactive-scatter-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 3. Assign global container pointer reference WITHOUT standard 'let' re-declaration
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 4. Configure linear coordinate domain extents based on data extrema bounds
    xScaleS.domain([0, d3.max(data, d => d.star)]).nice().range([0, innerWidth]);
    yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).nice().range([innerHeight, 0]);

    // 5. Set up categorical ordinal color scale using unique screenTech parameters
    colorScale.domain(["LCD", "LED", "OLED"]).range(["#00ff08e2", "#63adfbff", "#F3C052"]);

    // 6. Inject Bottom Horizontal & Left Vertical coordinate axis tracking layers
    innerChartS.append("g")
        .attr("class", "histogram-axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    innerChartS.append("g")
        .attr("class", "histogram-axis y-axis")
        .call(d3.axisLeft(yScaleS));

    // 7. Render Circle Vector points into chart panel area
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech.toUpperCase())) // Assign unique color based on display type
        .attr("opacity", 0.5);                       // Reduced opacity to visually handle overlapping clusters

    // 8. Axis Labels

    // X-Axis Label: Placed BACK at the absolute bottom center of the chart canvas
    svg.append("text")
        .text("Labeled Star Rating")
        .attr("x", width / 2)              
        .attr("y", height - 10)                     
        .attr("text-anchor", "middle")         
        .attr("class", "axis-label")
        .style("font-size", "11px")
        .style("font-family", "sans-serif")
        .style("fill", "#475569")
        .style("font-weight", "600");

    // Y-Axis Label: Rotated parallel left axis tracking title
    innerChartS.append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("transform", "rotate(-90)")   
        .attr("y", -50)         
        .attr("x", -innerHeight / 2)                     
        .attr("text-anchor", "middle")         
        .style("font-size", "11px")
        .style("font-family", "sans-serif")
        .style("fill", "#475569")
        .style("font-weight", "600");

    // Horizontal legend render loop
    const legendData = ["LED", "LCD", "OLED"];
    const itemSpacing = 65; // Horizontal gap space for each label group
    
    // Calculate total layout width to dynamically anchor it right flush with the chart bounds
    const totalLegendWidth = legendData.length * itemSpacing;
    const startX = innerWidth - totalLegendWidth + 10; 

    // Mount an isolated container node shifted slightly up past the chart inner workspace
    const legendGroup = innerChartS.append("g")
        .attr("id", "scatterplot-legend")
        .attr("transform", `translate(${startX}, -23)`);

    // Ingest array records to append the colored blocks loops
    const legendItems = legendGroup.selectAll(".legend-item")
        .data(legendData)
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(${i * itemSpacing}, 0)`);

    // Append square vector markers matching your exact chart hues color tokens mappings
    legendItems.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("rx", 2) 
        .attr("ry", 2)
        .attr("fill", d => colorScale(d));

    // Append descriptive characters right next to the matching box coordinates markers
    legendItems.append("text")
        .text(d => d)
        .attr("x", 18) 
        .attr("y", 11) 
        .style("font-size", "11px")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#475569")
        .style("font-weight", "700");
};