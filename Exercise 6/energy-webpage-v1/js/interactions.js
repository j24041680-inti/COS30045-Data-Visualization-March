
//User UI controls & interactions 

function populateFilters(data) {
    const controlsContainer = d3.select("#filters");
    controlsContainer.selectAll("*").remove();

    // Map button markers directly from your constants configuration structure metadata
    controlsContainer.selectAll("button")
        .data(filters_screen)
        .join("button")
        .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn")
        .attr("id", d => d.id)
        .text(d => d.label)
        // Bind the active cursor event listener click trigger routine
        .on("click", function(event, clickedItem) {
            
            // Loop through options and rewrite boolean configuration flags matching current choice
            filters_screen.forEach(btnConfig => {
                btnConfig.isActive = (btnConfig.id === clickedItem.id);
            });

            // Adjust highlighting css style assignments instantly
            d3.selectAll(".filter-btn")
                .data(filters_screen)
                .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn");

            // Fire dynamic data filtering reprocessing cycle
            updateHistogram(clickedItem.id, data);
        });
}

//Dynamic re-binding data pipeline & transitions handler

function updateHistogram(selectedFilterId, fullDataset) {
    // 1. Process custom data array subsets matching chosen criteria keys
    const updatedData = selectedFilterId === "all"
        ? fullDataset
        : fullDataset.filter(d => d.screenTech === selectedFilterId.toUpperCase());

    // 2. Re-slice the subset array coordinates through our reusable layout generator function
    const updatedBins = binGenerator(updatedData);

    // 3. Recalculate vertical scale peak domains to match shifted frequency ranges
    yScale.domain([0, d3.max(updatedBins, d => d.length)]).nice();

    const chartCoreGroup = d3.select("#chart-core-group");

    // 4. Smoothly update left frequency scale text coordinates numbers
    chartCoreGroup.select(".y-axis")
        .transition()
        .duration(600)
        .call(d3.axisLeft(yScale).ticks(6));

    // 5. Rebind updated data matrix array items to rect vectors tags
    chartCoreGroup.selectAll(".bar")
        .data(updatedBins)
        .join("rect")
        .attr("class", "bar")
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", "1.5px")
        // Chain an animated interpolator to transform rectangle shapes metrics
        .transition()
        .duration(750)               // Transition step runtime duration time metrics inside framework (Step 7.4)
        .ease(d3.easeCubicOut)       // Decelerates motion profile dynamically to look professional
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barFillColor);
        
}

// Exercise 6.2: SVG-Native Hover Tooltip Constructors //

// Append unified tooltip elements directly onto the scatterplot's innerChartS group
const createTooltip = () => {
    // Append target vector node with default transparent layout tracking
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Inject background card with flexible bounding box capabilities
    tooltip.append("rect")
        .attr("id", "tooltip-bg")
        .attr("rx", 5) // Rounded corner arc width
        .attr("ry", 5) // Rounded corner arc height
        .attr("fill", barColor) // Charcoal layout color
        .attr("fill-opacity", 1.0); // Slightly more opaque for multi-line text readability

    // Inject multi-line text element tracking layer
    tooltip.append("text")
        .attr("id", "tooltip-text")
        .attr("fill", "white")
        .style("font-size", "11px")
        .style("font-family", "'Segoe UI', system-ui, sans-serif");
};

// Handle Mouse Event Handshaking Listeners
const handleMouseEvents = () => {
    // Target every circle rendering element inside the scatter chart space
    innerChartS.selectAll("circle")
        // Capture mouseenter events to position and reveal the tooltip bubble
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d); // Verification terminal trace

            const tooltipG = d3.select(".tooltip");
            const tooltipText = tooltipG.select("#tooltip-text");

            // Clear any historical line elements left over from previous hovers
            tooltipText.selectAll("*").remove();

            // Sanitize and format data strings gracefully
            const brandStr = d.brand ? d.brand.toUpperCase() : "UNKNOWN";
            const modelStr = d.model ? d.model : "GENERIC";
            const sizeStr = `${d.screenSize}" Panel (${d.screenTech})`;

            // Inject Multi-Line content blocks using SVG <tspan> tags
            tooltipText.append("tspan")
                .text(`${brandStr} — ${modelStr}`)
                .attr("x", 10)
                .attr("y", 18)
                .style("font-weight", "700")
                .style("fill", colorScale(d.screenTech.toUpperCase())); // Highlight brand name in the Screen Tech color

            tooltipText.append("tspan")
                .text(sizeStr)
                .attr("x", 10)
                .attr("y", 34)
                .style("font-weight", "500");

            // Dynamic sizing: Ask the browser to calculate the exact width/height of the text strings
            const textNode = tooltipText.node();
            const bbox = textNode.getBBox();

            // Pad the background card limits slightly so the text has clean breathing room edges
            const dynamicWidth = bbox.width + 20; 
            const dynamicHeight = 45; 

            // Apply calculated constraints down to the background SVG rectangle
            tooltipG.select("#tooltip-bg")
                .attr("width", dynamicWidth)
                .attr("height", dynamicHeight);

            // Extract coordinate parameters directly from event target
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Apply centering offsets using our new fluid dimension footprints
            tooltipG
                .attr("transform", `translate(${cx - 0.5 * dynamicWidth}, ${cy - dynamicHeight - 10})`)
                .transition()
                .duration(150) // Crisp, snappy transition duration
                .style("opacity", 1);
        })
        // Capture mouseleave events to hide and park the tooltip group off-screen
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Hide element and transition group out of standard viewport bounds
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};