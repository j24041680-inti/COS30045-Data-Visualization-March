// Shared constants engine

// Bounding Layout Coordinates (Dufour & Meeks Strategy)
const margin = { top: 30, right: 30, bottom: 50, left: 70 }; // Unified structural margin spacing
const width = 800;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Color Tokens
const barFillColor = "#007BFF";        // Action Electric Blue
const bodyBackgroundColor = "#f0f4f8"; // Background color to isolate bar cuts
const barColor = "#606464";            // Dark grey color token matching your workbook specifications

// Global Base Template Scale Functions for Histogram (6.1)
const xScale = d3.scaleLinear().range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);


// Exercise 6.2 Global State Declarations & Scalers
let innerChartS;                  // Shared anchor holding the scatterplot's inner chart group
const tooltipWidth = 65;          // Fixed width for tooltip rectangle
const tooltipHeight = 32;         // Fixed height for tooltip rectangle

const xScaleS = d3.scaleLinear(); // Dedicated Scatterplot X-Scale template pointer
const yScaleS = d3.scaleLinear(); // Dedicated Scatterplot Y-Scale template pointer
const colorScale = d3.scaleOrdinal()
    .domain(["LCD", "LED", "OLED"])
    .range(["#00ff08e2", "#63adfbff", "#F3C052"]);// Dedicated Categorical Color palette mapping scale

// Filter State Mapping Control Array Elements
const filters_screen = [
    { id: "all", label: "ALL", isActive: true },
    { id: "lcd", label: "LCD", isActive: false },
    { id: "led", label: "LED", isActive: false },
    { id: "oled", label: "OLED", isActive: false }
];

// Global Reusable Bin Generator Blueprint Configuration
const binGenerator = d3.bin()
    .value(d => d.energyConsumption) // Focus key evaluation element target
    .thresholds(9);                  // Set to 9 thresholds to group elements continuously without layout gaps