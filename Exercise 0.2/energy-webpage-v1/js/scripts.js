// Run this when the script loads
document.addEventListener('DOMContentLoaded', () => {
    loadEnergyData();
    showPage('home'); 
});

async function loadEnergyData() {
    try {
        const response = await fetch('./data/data.csv');
        
        // Check if the file actually exists before processing
        if (!response.ok) throw new Error("File not found");

        const data = await response.text();
        
        const rows = data.split('\n'); 
        let tableHtml = '<table class="energy-table"><thead><tr>';
        
        // Create Headers from the first row
        const headers = rows[0].split(',');
        headers.forEach(header => {
            tableHtml += `<th>${header.trim()}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        // Create Rows
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === "") continue; 
            const cols = rows[i].split(',');
            tableHtml += '<tr>';
            cols.forEach(col => {
                tableHtml += `<td>${col.trim()}</td>`;
            });
            tableHtml += '</tr>';
        }

        tableHtml += '</tbody></table>';
        document.getElementById('csv-table-container').innerHTML = tableHtml;

    } catch (error) {
        console.error("Error loading CSV:", error);
        document.getElementById('csv-table-container').innerHTML = 
            `<p style="color:red;">Unable to load energy data. (Error: ${error.message})</p>`;
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }

    // Update active state in Nav
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));
    
    // Highlight the correct link (even if logo is clicked)
    const activeLink = document.getElementById('link-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}