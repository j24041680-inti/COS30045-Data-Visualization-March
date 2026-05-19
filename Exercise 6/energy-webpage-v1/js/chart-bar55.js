// Bar Chart
{
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3.select("#bar-container")
        .append("svg")
        .attr("viewBox", "0 0 600 350")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const barColorScale = d3.scaleOrdinal()
        .domain(["LCD", "LED", "OLED"])
        .range(["#00ff08e2", "#63adfbff", "#F3C052"]);    

    d3.csv("./data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => {
        return {
            tech: d.Screen_Tech.trim().toUpperCase(),
            value: +d["Mean(Labelled energy consumption (kWh/year))"]
        };
    }).then(data => {

        // 1. Establish discrete categorical band layout schemas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.tech))
            .range([0, width])
            .padding(0.45); 

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height, 0]);

        // 2. Construct structural visual axes elements
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`) 
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale).ticks(5));

        // Y axis labelling
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)") // Rotates the text parallel to the left axis
            .attr("y", -45)                   // Pulls it leftward, safely clear of the scale numbers
            .attr("x", -height / 2)           // Centers it vertically along the axis line track
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("fill", "#475569")
            .style("font-weight", "600")
            .text("Labeled Energy Consumption (kWh/year)");

        // 3. Execute rectangle injections
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => xScale(d.tech))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth()) 
            .attr("height", d => height - yScale(d.value)) 
            .attr("fill", d => barColorScale(d.tech));

        // 4. Data annotation overlays (Direct Value tags above vertex points)
        svg.selectAll(".bar-label")
            .data(data)
            .join("text")
            .attr("x", d => xScale(d.tech) + xScale.bandwidth() / 2) 
            .attr("y", d => yScale(d.value) - 8)                     
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("fill", "#334155")
            .text(d => `${d.value.toFixed(1)} kWh`); 
    });
}