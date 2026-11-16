
// 1. CONFIGURATION

const API_KEY = '06fd97f53e251cde0262f6cc3e169a06';

// GNews Top Headlines endpoint
const API_URL = `https://api.allorigins.win/get?url=${encodeURIComponent('https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=' + API_KEY)}`;

// DOM Elements
const newsContainer = document.getElementById('news-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');

// 2. FETCH DATA FROM API
async function fetchNews() {
    try {
        // Show loading, hide error
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        newsContainer.innerHTML = '';

        // Make the API request
        const response = await fetch(API_URL);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
const rawData = await response.json();
const data = JSON.parse(rawData.contents);

        // Log the raw data to console for debugging
        console.log('API Response:', data);

        // Check if articles exist
        if (!data.articles || data.articles.length === 0) {
            throw new Error('No articles found.');
        }

        // Display the articles
        displayNews(data.articles);

    } catch (error) {
        // Handle any errors (network, parsing, etc.)
        console.error('Error fetching news:', error);
        errorElement.textContent = `Failed to load news: ${error.message}`;
        errorElement.classList.remove('hidden');
    } finally {
        // Hide loading indicator regardless of success/failure
        loadingElement.classList.add('hidden');
    }
}

// 3. DISPLAY NEWS ON THE PAGE
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous content

    articles.forEach(article => {
        // Create card container
        const card = document.createElement('div');
        card.className = 'news-card';

        // Use a placeholder image if the article has no image
        const imageUrl = article.image || 'https://via.placeholder.com/300x180?text=No+Image';

        // Build the inner HTML for the card
        card.innerHTML = `
            <img src="${imageUrl}" alt="News Image" onerror="this.src='https://via.placeholder.com/300x180?text=Image+Error'">
            <div class="news-card-content">
                <h3>${article.title || 'No Title'}</h3>
                <p>${article.description || 'No description available for this article.'}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read Full Article &rarr;</a>
            </div>
        `;

        // Append to the container
        newsContainer.appendChild(card);
    });
}

// 4. INITIALIZE
// Run the fetch function when the page loads
document.addEventListener('DOMContentLoaded', fetchNews);
