const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const selectBar = document.getElementById('select_bar');
const score = document.getElementById('score');
const left = document.getElementById('left');
const right = document.getElementById('right');
let random, playerScore = 0, botScore = 0;

function randomImage(hand) {
    let images = ['img/rock.png', 'img/paper.png', 'img/scissors.png'];
    let currentImage = `img/${hand.src.substring(hand.src.lastIndexOf('/') + 1)}`;
    images = images.filter(item => item !== currentImage);
    hand.src = images[Math.floor(Math.random() * 2)];
}

firstRandom = setInterval(() => {
    randomImage(left);
    randomImage(right);
}, 500);

function botRandom() {
    const items = ['rock', 'paper', 'scissors'];
    return items[Math.floor(Math.random() * 3)];
}

function getWinner(playerSelect, botSelect) {
    if (playerSelect === botSelect) {
        return 'draw';
    } else if (
        (playerSelect === 'rock' && botSelect === 'scissors') ||
        (playerSelect === 'paper' && botSelect === 'rock') ||
        (playerSelect === 'scissors' && botSelect === 'paper')
    ) {
        return 'player';
    } else {
        return 'bot';
    }
}

function addScore(winner) {
    if (winner === 'player') {
        playerScore++
    } else if (winner === 'bot') {
        botScore++
    }
    score.innerHTML = `${playerScore} : ${botScore}`
}

resetButton.style.display = 'none';
selectBar.style.display = 'none';

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    resetButton.style.display = 'none';
    selectBar.style.display = '';
    clearInterval(firstRandom);
    random = setInterval(() => {
        randomImage(left);
        randomImage(right);
    }, 250);
})

resetButton.addEventListener('click', () => {
    resetButton.style.display = 'none';
    playerScore = 0;
    botScore = 0;
    score.innerHTML = `${playerScore} : ${botScore}`
})

selectBar.addEventListener('click', event => {
    const playerSelect = event.target.id;
    if (playerSelect === 'rock' || playerSelect === 'paper' || playerSelect === 'scissors') {
        startButton.style.display = '';
        resetButton.style.display = '';
        selectBar.style.display = 'none';
        clearInterval(firstRandom);
        clearInterval(random);
        left.src = `img/${playerSelect}.png`;
        const botSelect = botRandom();
        right.src = `img/${botSelect}.png`;
        const winner = getWinner(playerSelect, botSelect);
        addScore(winner);
    }
})

// Change Theme
const changeTheme = document.getElementById('change_theme');

changeTheme.addEventListener('click', () => {
    if (document.body.className === 'dark-mode') {
        setLightMode();
    } else {
        setDarkMode();
    }
})

function setDarkMode() {
    document.body.classList.add('dark-mode');
    changeTheme.innerHTML = '<i class="ri-moon-fill"></i>';
    saveTeme('darkMode');
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    changeTheme.innerHTML = '<i class="ri-sun-fill"></i>';
    saveTeme('lightMode');
}

// Save Theme
function saveTeme(theme) {
    localStorage.setItem('theme', theme);
}

// Get Theme
const theme = localStorage.getItem('theme');

if (theme === 'darkMode') {
    setDarkMode();
} else if (theme === 'lightMode') {
    setLightMode();
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode();
}

// Detect Theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        setDarkMode();
    } else {
        setLightMode();
    }
});