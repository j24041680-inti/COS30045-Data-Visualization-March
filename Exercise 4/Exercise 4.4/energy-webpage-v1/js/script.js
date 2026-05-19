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

function filterTable() {
    // Get the text from the search box
    const input = document.getElementById("tvSearch");
    const filter = input.value.toUpperCase();
    const table = document.querySelector(".energy-table");
    
    // Safety check: only run if the table exists
    if (!table) return;

    const tr = table.getElementsByTagName("tr");

    // Loop through all table rows (starting from index 1 to skip header)
    for (let i = 1; i < tr.length; i++) {
        let rowMatch = false;
        const td = tr[i].getElementsByTagName("td");
        
        // Check Brand (column 0) and Model (column 1)
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                const txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatch = true;
                    break;
                }
            }
        }

        // Show/Hide the row based on the match
        tr[i].style.display = rowMatch ? "" : "none";
    }
}

/* --- DATA STORY MODAL & CAROUSEL FUNCTIONS --- */

// Function to open and zoom the storyboard modal
function openStoryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex"; 
        // Small timeout to allow 'display: flex' to register before adding the 'active' class
        setTimeout(() => {
            modal.classList.add("active");
        }, 10);
        document.body.style.overflow = "hidden";
    }
}

// Close Function
function closeStoryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
        // Wait for the transition to finish before hiding display
        setTimeout(() => {
            modal.style.display = "none";
        }, 400); 
        document.body.style.overflow = "auto";
    }
}

// Interactive Carousel Navigation
function moveSlide(carouselId, direction) {
    // Find the container for THIS specific carousel
    const container = document.getElementById(carouselId);
    if (!container) return;

    const slides = container.getElementsByClassName("carousel-slide");
    let activeIndex = -1;

    // Find current active frame
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            activeIndex = i;
            slides[activeIndex].classList.remove("active");
            break;
        }
    }

    // Default to first slide if none are active
    if (activeIndex === -1) activeIndex = 0;

    // Calculate next index and loop
    let nextIndex = (activeIndex + direction + slides.length) % slides.length;
    slides[nextIndex].classList.add("active");
}