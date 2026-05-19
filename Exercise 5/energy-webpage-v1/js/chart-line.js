// Line Chart with Shaded Area

{
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3.select("#line-container")
        .append("svg")
        .attr("viewBox", "0 0 600 350")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initialize date parser utility function
    const parseYear = d3.timeParse("%Y");

    // Define gradient fill to make the shading fade out smoothly
    const defs = svg.append("defs");
    const areaGradient = defs.append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%"); // Forces a pure vertical top-to-bottom direction

    // Top stop: Matches your light blue line color with subtle opacity
    areaGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#63adfb")
        .attr("stop-opacity", 0.4);

    // Bottom stop: Fades out completely to transparent right at the bottom axis line
    areaGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#63adfb")
        .attr("stop-opacity", 0.0);

    d3.csv("./data/Ex5_ARE_Spot_Prices.csv", d => {
        return {
            year: parseYear(d.Year.trim()),
            price: +d["Average Price (notTas-Snowy)"]
        };
    }).then(data => {
        // Drop bad or empty data points
        const cleaned = data.filter(d => d.year !== null && !isNaN(d.price));

        // Critical time-series requirement: Sort chronological objects arrays strictly from oldest-to-newest direction
        cleaned.sort((a, b) => a.year - b.year);

        // Configure time scale engine for timestamps
        const xScale = d3.scaleTime()
            .domain(d3.extent(cleaned, d => d.year)) 
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleaned, d => d.price)]).nice()
            .range([height, 0]);

        // Axels generation appendings
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(6));

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale).ticks(6));

        // 1. Initialize area path generator
        const areaPathGenerator = d3.area()
            .x(d => xScale(d.year))
            .y0(height)                 // Sets the bottom baseline boundary to the bottom axis line
            .y1(d => yScale(d.price))   // Sets the top boundary to track your line's current values
            .curve(d3.curveMonotoneX);  // Keeps the mathematical spline curve perfectly synced with the line

        // 2. Append the shaded area element to your canvas layout
        svg.append("path")
            .datum(cleaned)
            .attr("d", areaPathGenerator)
            .attr("fill", "url(#area-gradient)"); // Links directly to your vertical gradient definition

        // 3. Initialize path coordinates interpolator generator
        const linePathGenerator = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.price))
            .curve(d3.curveMonotoneX);      

        // 4. Append the continuous path vector to the canvas (Renders right on top of your shading)
        svg.append("path")
            .datum(cleaned)                 
            .attr("d", linePathGenerator)   
            .attr("fill", "none")           
            .attr("stroke", "#63adfbff")    
            .attr("stroke-width", 2.5);

        // 5. Vertical title system axis annotation
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)") 
            .attr("y", -45)                   
            .attr("x", -height / 2)
            .attr("text-anchor", "middle")
            .text("$ per Megawatt Hour (AUD Baseline Index)");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + 35) // Drops it cleanly below the axis tick values
            .attr("text-anchor", "middle") 
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("fill", "#475569")
            .style("font-weight", "600")
            .text("Year");
    });
}