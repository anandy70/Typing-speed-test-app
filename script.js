// DOM Elements
const inputField = document.querySelector('.input-field');
const typingText = document.querySelector('.typing-text p');
const timeDisplay = document.querySelector('.time span b');
const mistakeDisplay = document.querySelector('.mistake span');
const wpmDisplay = document.querySelector('.wpm span');
const cpmDisplay = document.querySelector('.cpm span');
const restartBtn = document.querySelector('.restart-btn');

let timeLeft = 60;
let charIndex = 0;
let mistakes = 0;
let timer;
let isTyping = false;

// Start the timer
function startTimer() {
    if (!isTyping) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
            } else {
                clearInterval(timer);
                inputField.disabled = true;
                typingText.textContent = "Time's up!";
            }
        }, 1000);
        isTyping = true;
    }
}

// Typing logic
function handleTyping() {
    const typedText = inputField.value.split('');
    const originalText = typingText.textContent.split('');
    
    // Check each character
    if (charIndex < originalText.length) {
        if (typedText[charIndex] === originalText[charIndex]) {
            charIndex++;
        } else {
            mistakes++;
            mistakeDisplay.textContent = mistakes;
        }
    }
    
    // Update WPM and CPM
    const elapsedTime = 60 - timeLeft;
    const typedChars = charIndex + mistakes;
    const words = Math.floor(typedChars / 5);
    const wpm = elapsedTime > 0 ? Math.round(words / (elapsedTime / 60)) : 0;
    const cpm = elapsedTime > 0 ? Math.round(typedChars / (elapsedTime / 60)) : 0;
    wpmDisplay.textContent = wpm;
    cpmDisplay.textContent = cpm;
    
    // If complete
    if (typedText.length === originalText.length) {
        clearInterval(timer);
        inputField.disabled = true;
        typingText.textContent = "Completed!";
    }
}

// Restart the game
function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    
    inputField.disabled = false;
    inputField.value = '';
    typingText.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, dolorum.";
    timeDisplay.textContent = timeLeft;
    mistakeDisplay.textContent = mistakes;
    wpmDisplay.textContent = 0;
    cpmDisplay.textContent = 0;
}

// Event Listeners
inputField.addEventListener('input', () => {
    startTimer();
    handleTyping();
});

restartBtn.addEventListener('click', resetGame);
