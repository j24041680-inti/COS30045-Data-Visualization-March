// Donut Chart
{
    const width = 600;
    const height = 350;
    const radius = Math.min(width, height) / 2 - 20; // Establishes maximum outer radius perimeter limits

    const svg = d3.select("#donut-container")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`); // Pivots center origin to center of card grid

    // Establish categorical ordinal color scheme map strings
    const colorPalette = d3.scaleOrdinal()
        .domain(["LCD", "LED", "OLED"])
        .range(["#00ff08e2", "#63adfbff", "#F3C052"]); // Navy, Blue, Gold theme consistency match

    d3.csv("./data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => {
        return {
            tech: d.Screen_Tech.trim().toUpperCase(),
            // Literal bracket notation matching exactly the column string inside CSV file header schema
            value: +d["Mean(Labelled energy consumption (kWh/year))"]
        };
    }).then(data => {

        // 1. Initialize pie layout (Data Preprocessing Step)
        const pieLayout = d3.pie()
            .value(d => d.value) // Declares the target variable metric that dictates sector weight size
            .sort(null);          // Leaves default sorting alone to respect baseline file order sequence

        // 2. CConfigure geometric shape path builder engine
        const arcGenerator = d3.arc()
            .innerRadius(65)  // Set value > 0 to hollow center opening, transforming chart into a Donut Chart
            .outerRadius(165) // Outer limit boundary edge extension 
            .padAngle(0.04);  // Adds visual padding gap separation splices between adjacent wedges

        // 3. Merge geometric layout strings with data
        const slices = svg.selectAll("path")
            .data(pieLayout(data)) // Passes compiled start/end angles arrays straight into processing pipelines
            .join("g");

        // Inject path elements using calculated paths properties
        slices.append("path")
            .attr("d", arcGenerator) // Feeds layout radian dimensions into arc draw directions
            .attr("fill", d => colorPalette(d.data.tech));

        // 4. Inject overlay annotation labels using trigonometric centroids
        slices.append("text")
            // arcGenerator.centroid(d) automatically calculates the geometric 'center of mass' point for labels
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle") // Modifies precise vertical letter centering balance inside cell
            .style("fill", "#000000ff")
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .style("font-weight", "600")
            .text(d => `${d.data.tech} (${Math.round(d.data.value)} kWh)`);
    });
}