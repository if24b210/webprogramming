// Variables
let matchedPairs = 0;           // Track the number of matched pairs.
let moveCounter = 0;            // Track the number of attempts made by the player
let gameStartTimer = 0;         // Start Time
let startGame = false;          // Time starting point is click on card in flipCard()
let timerTicker;                // live Timer update beim ersten click in flipCard
let flippedCards = [];          // Stored values into new array for later comparision.

// Data Arrays with matching pairs / difficalty level
let cardsEasy =     ["🍎", "🍎", "🍌", "🍌"];
let cardsMedium =   ["🍎", "🍎", "🍇", "🍇", "🍉", "🍉"];
let cardsHard =     ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉"];
let cards = cardsHard;

console.log("Cards from pre-defined Array:", cards);

// DOM Elements
const gameBoard = document.getElementById('game-board');        // -> Generate and display Cards dynamically
const resetButton = document.getElementById('reset-button');    // Reset Button, Shuffle Function, move counter, time reset
const levelSelect = document.getElementById('level');           // Dropdown Difficulty Level

// Event Listeners
resetButton.addEventListener('click', resetGame); 
levelSelect.addEventListener('change', resetGame); // Difficulty Levels: changing Game level and start new Game

// Functions
function shuffle(array) {   // Shuffle the array
    array.sort(() => Math.random() - 0.5);
}

function generateCards() {  // Generate Cards 
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');

        card.classList.add('card', 'text-center');
        card.dataset.cardValue = symbol; // symbol is stored in data-card-value
        card.id = index + 1;             // assign unique id to each card
        card.textContent = '?';
        
        card.addEventListener('click', flipCard);
        
        gameBoard.appendChild(card);
    });
}

function flipCard(event) {  // Implementing Flip Logic
    if(flippedCards.length === 2) {
        console.log("Two cards are already flipped!");
        return;    
    }

    const card = event.target;

    console.log("Clicked card: ", card);

    if(card.classList.contains('flipped')) {
        return;
    }

    // take the symbol from data-stored value
    console.log("Card id:", card.id, ", Symbol:", card.dataset.cardValue);
    
    // Timer: startGame on first click
    if(!startGame) {

        gameStartTimer = Date.now();
        startGame = true;

        timerTicker = setInterval(() => {
        
            timeUpdater();

        }, 1000);
        console.log("Timer Ticker: " + timerTicker);
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.cardValue;  // show symbol
    
    flippedCards.push(card);                    // save the flipped card in the array

    console.log(
        "Flipped:", 
        flippedCards.map(card => card.dataset.cardValue)); // show symbols of flipped cards
    
    if (flippedCards.length === 2) {
        moveCounter++;
        
        document.getElementById('move-counter').textContent = 'Moves: ' + moveCounter;

        checkForMatch();  
    }
}

function checkForMatch() {  // Check for Matches

    const [card1, card2] = flippedCards; // compare
    console.log("comparing cards:", card1.dataset.cardValue, " and ", card2.dataset.cardValue);

    if(card1.dataset.cardValue === card2.dataset.cardValue) {
        
        // visual add-ons
        card1.classList.add('matched');
        card2.classList.add('matched');

        matchedPairs++;
        console.log("[OK]: Matched Pairs: ", matchedPairs);

        // Display a message when all pairs have been successfully matched.
        if(matchedPairs === cards.length / 2)  {    // pairs
            console.log("All pairs have been successfully matched!");
            
            clearInterval(timerTicker);     // STOP Timer

            timeUpdater();
           
            const winMessage = document.getElementById('game-win-message');
            
            winMessage.style.display = 'block';
        }

        // Reset the second Array if there's a match
        flippedCards = []; 

    } else {
        console.log("[NOK]: Not Matched");

        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '?';

            card2.classList.remove('flipped');
            card2.textContent = '?';

            // new element will be stored again in Array
            flippedCards = [];

            // Wait 1 seconds and get cards back into game ...
        }, 1000);
    }
}

function timeUpdater() { // On First Click and Win Game 
            let timeElapsed = Date.now() - gameStartTimer;
            
            let timeActual = new Date(timeElapsed).toLocaleTimeString([], {
                minute: '2-digit',
                second: '2-digit'
            });

            document.getElementById('game-timer').textContent = 'Time: ' + timeActual;           
}

function resetGame() {      // Reset

    clearInterval(timerTicker);
    
    gameBoard.innerHTML = '';

    flippedCards = [];
    matchedPairs = 0;
    moveCounter = 0;

    startGame = false;
    gameStartTimer = 0;

    document.getElementById('game-win-message').style.display = 'none';
    document.getElementById('move-counter').textContent = 'Moves: 0';
    document.getElementById('game-timer').textContent = 'Time: 00:00';

    let level = parseInt(
        document.getElementById('level').value
    );

    if(level === 2) { 
        cards = cardsEasy;
        gameBoard.style.gridTemplateColumns = 'repeat(2, 100px)';
    
    } else if (level === 3) { 
        cards = cardsMedium; 
        gameBoard.style.gridTemplateColumns = 'repeat(3, 100px)';
    
    } else {
        cards = cardsHard;
        gameBoard.style.gridTemplateColumns = 'repeat(4, 100px)';
    }
        
    shuffle(cards);
    generateCards();
}

// Memory Game: Start
shuffle(cards);
console.log("Cards after shuffle:", cards);
generateCards();




