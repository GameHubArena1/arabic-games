// GameHub Online - English Version

// Game Database
const games = [
    {
        id: 1,
        title: "Fast Car Racing",
        category: "racing",
        description: "Challenge yourself in the fastest car race! Avoid obstacles and collect points.",
        embedCode: '<iframe src="https://www.example-embed.com/game1" width="800" height="600" frameborder="0"></iframe>'
    },
    {
        id: 2,
        title: "Puzzle Challenge",
        category: "puzzle",
        description: "Test your intelligence with a collection of challenging puzzles.",
        embedCode: '<iframe src="https://www.example-embed.com/game2" width="800" height="600" frameborder="0"></iframe>'
    },
    {
        id: 3,
        title: "World Soccer",
        category: "sports",
        description: "Become a soccer legend and score amazing goals!",
        embedCode: '<iframe src="https://www.example-embed.com/game3" width="800" height="600" frameborder="0"></iframe>'
    }
];

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Load games in games.html
    loadGames();
});

// Load games on games.html page
function loadGames() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Filter games by category
    let filteredGames = games;
    if (category && category !== 'all') {
        filteredGames = games.filter(game => game.category === category);
    }
    
    // Display games
    gamesGrid.innerHTML = '';
    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="https://img.itch.zone/aW1nLzEzODUzNDk5LnBuZw==/original/%2B%2Bh%2BP.png" alt="${game.title}">
                <div class="game-overlay">
                    <a href="game.html?id=${game.id}" class="btn-play">Play Now <i class="fas fa-play"></i></a>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-category"><i class="fas fa-tag"></i> ${getCategoryName(game.category)}</span>
                    <span class="game-rating"><i class="fas fa-thumbs-up"></i> ${Math.floor(Math.random() * 10) + 85}%</span>
                </div>
                <p>${game.description}</p>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Get category name in English
function getCategoryName(category) {
    const categories = {
        action: "Action",
        puzzle: "Puzzle",
        sports: "Sports",
        racing: "Racing",
        strategy: "Strategy"
    };
    return categories[category] || category;
}

// Load specific game on game.html page
function loadGame() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    // Get game ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    
    // Find the game
    const game = games.find(g => g.id === gameId);
    
    if (game) {
        // Display game
        document.getElementById('game-title').textContent = game.title;
        document.getElementById('game-description').textContent = game.description;
        document.getElementById('game-category').textContent = getCategoryName(game.category);
        gameContainer.innerHTML = game.embedCode;
    } else {
        gameContainer.innerHTML = '<p>Game not found. Please return to <a href="games.html">games page</a>.</p>';
    }
}
