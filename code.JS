

const database = [
    {
        name: "Solutions",
        keywords: ["help", "fix", "answer"],
        description: "Discover powerful digital answers.",
        link: "solutions.html" // Changed from #solutions to the file name
    },
    {
        name: "Creativity",
        keywords: ["art", "design"],
        description: "Unleash your design potential.",
        link: "creativity.html" // Changed from #creativity
    }
    

];


// 2. ELEMENT SELECTION
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsBox = document.getElementById('resultsList');
// 3. SEARCH LOGIC

function performSearch(term) {
    const searchWord = term.toLowerCase();

   // 1. Check your local database first
    const match = database.find(item => 
        item.name.toLowerCase().startsWith(searchWord) || 
        (item.keywords && item.keywords.some(key => key.startsWith(searchWord)))
    );

    resultsBox.innerHTML = '';

    if (match) {
        // Show your local result
        resultsBox.classList.add('open');
        resultsBox.innerHTML = `
            <div class="result-item" onclick="navigateAndClose('${match.link}', '${match.name}')">
                <strong>${match.name}</strong><br>
                <small>${match.description}</small>
            </div>
        `;
    } else if (searchWord.length > 1) {
        // 2. FALLBACK: Show a flashy Google Search button
        resultsBox.classList.add('open');
        resultsBox.innerHTML = `
            <div class="result-item google-style" onclick="window.open('https://www.google.com/search?q=${term}', '_blank')">
                <strong>🔍 Search Google for "${term}"</strong><br>
                <small> Click to search the web.</small>
            </div>
        `;
    } else {
        resultsBox.classList.remove('open');
    }
}


// 4. EVENT LISTENER AT THE BOTTOM
searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();

    if (query.length > 0) {
        performSearch(query); // Shows results instantly as you type
    } else {
        resultsBox.classList.remove('open'); // Closes box if bar is empty
    }
});

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query !== '') {
        performSearch(query);
    }
});

// Closes the search box if you click outside the form
document.addEventListener('click', function (e) {
    if (!searchForm.contains(e.target)) {
        resultsBox.classList.remove('open');
    }
});

function navigateAndClose(link, name) {
    // 1. Find the item that was clicked to show loading state
    const items = document.querySelectorAll('.result-item');
    items.forEach(item => {
        if (item.innerText.includes(name)) {
            item.classList.add('loading');
            item.innerHTML = `<span class="loading-spinner"></span> Opening ${name}...`;
        }
    });

    // 2. Save the name to memory
    localStorage.setItem('recentSearch', name);

    // 3. Small delay to let the user see the spinner before the page flips
    setTimeout(() => {
        window.location.href = link; // Redirect to the new page
    }, 400);
}
















