// Data Loading & Initialization

// Memory buffer to preserve full raw records fields across filter passes
let globalDataset = [];

function loadAndInitDashboard() {
    // Load Clean Dataset asynchronously from local repository
    d3.csv("./data/Ex6_TVdata.csv", d => {
        return {
            brand: d.brand,
            model: d.model,
            screenSize: +d.screenSize, // Force string to number conversion
            screenTech: d.screenTech ? d.screenTech.trim().toUpperCase() : "UNKNOWN",
            energyConsumption: +d.energyConsumption, // Force string to number conversion
            star: +d.star // Force string to number conversion
        };
    }).then(data => {
        // Filter anomalies and extreme outlier records to prevent axis skewing
        globalDataset = data.filter(d => d.energyConsumption > 0 && d.screenTech !== "UNKNOWN" && d.energyConsumption < 2000);

        console.log("Data layer active. Count verified:", globalDataset.length); // Console trace audit verification
        
        drawHistogram(globalDataset);   // 1. Render primary static histogram graph lines
        drawScatterplot(globalDataset); // 2. Render primary static scatter points coordinates
        createTooltip();                // 3. Mount hidden SVG Tooltip layers into group container
        handleMouseEvents();            // 4. Bind pointer hover interaction event listeners
        populateFilters(globalDataset); // 5. Construct operational filter buttons row
        
    }).catch(error => {
        console.error("Fatal exception parsing external data file text strings:", error);;
    });
}

// Global window container rendering listener lifecycle trigger
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("histogram-chart")) {
        loadAndInitDashboard();
    }
});