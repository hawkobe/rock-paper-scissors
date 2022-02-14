// Setting up variables to store event listeners
const selection = document.querySelectorAll('.selector');
const flavor = document.querySelector('#win-loss-flavor');
const scorePlayer = document.querySelector('.player-score');
const scoreComputer = document.querySelector('.computer-score');
const endGameMessage = document.querySelector('#end-game-message');
const playerChoice = document.querySelector('.player-choice')
const computerChoice = document.querySelector('.computer-choice');
const images = document.querySelectorAll('img');
const vs = document.querySelector('span');
const selectors = document.querySelectorAll('#selectors > *');
const content = document.querySelector('.content');
const resetButton = document.createElement('button');
resetButton.textContent = 'Play Again';
resetButton.classList.add('reset');

// defining global variables
let playerScore = 0;

let computerScore = 0;

let roundNumber = 0;

// makes a random choice between rock, paper, or scissors
function computerPlay() {
    let random = ['rock', 'paper', 'scissors'];
    return random[Math.floor(Math.random() * random.length)];
}


// handles which image to pick from choice
function choosePlayerImage(e) {

    if (this.textContent === 'Rock') {
        images[0].src = "https://icon-library.com/images/rock-icon-png/rock-icon-png-18.jpg";
    } else if (this.textContent === 'Paper') {
        images[0].src = "https://icon-library.com/images/paper-stack-icon/paper-stack-icon-14.jpg";
    } else {
        images[0].src = "https://icon-library.com/images/cissors-cut-cutting-512_11309.png";
    }
}


function chooseComputerImage(computerSelection) {

    if (computerSelection === 'rock') {
        images[1].src = "https://icon-library.com/images/rock-icon-png/rock-icon-png-18.jpg";
    } else if (computerSelection === 'paper') {
        images[1].src = "https://icon-library.com/images/paper-stack-icon/paper-stack-icon-14.jpg";
    } else {
        images[1].src = "https://icon-library.com/images/cissors-cut-cutting-512_11309.png";
    }
}


// adds active class to elements for styling purposes
function toggleActive() {
    this.classList.add('active');
    images[0].classList.add('active');
    images[1].classList.add('active');
    vs.classList.add('active');
    playerChoice.classList.add('active');
    computerChoice.classList.add('active');
}

// removes active class when final transition is complete
function removeActive(e) {
    if (e.propertyName !== 'transform') return;

    selectors.forEach(selector => selector.classList.remove('active'));
    vs.classList.remove('active');
    images[1].classList.remove('active');
    images[0].classList.remove('active');
    playerChoice.classList.remove('active');
    computerChoice.classList.remove('active');
}

// for end of game, to disable buttons
function removeListeners() {
    selection.forEach(button => button.removeEventListener('click', playRound));
    selection.forEach(button => button.removeEventListener('click', choosePlayerImage));
    selection.forEach(button => button.removeEventListener('click', toggleActive));
}

// handles end games messages and populates reset button
function gameEnd() {
    if (playerScore === 5 || computerScore === 5) {
        if  (playerScore > computerScore) {
            endGameMessage.textContent = 'Much luck you have, human. You have beaten me, for now...';
        } else {
        endGameMessage.textContent = 'I have won! Such is the way probability. Unfortunately, it took no skill';
        }
        removeListeners();
        content.appendChild(resetButton);
    }           
}

// refreshes page when you select Play Again
function refreshPage() {
    window.location.reload(true);
}

// Takes care of what happens between player and computer choices, and assigns a score
function playRound(e) {
    let playerSelection = e.target.textContent.toLowerCase()
    let computerSelection = computerPlay();

    if (playerSelection === computerSelection) {
    flavor.textContent = 'It\'s a Tie!';
    }
    if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            computerScore++;
            flavor.textContent = 'You lose! Paper Beats rock.';
        } else if (computerSelection === 'scissors') {
            playerScore++;
            flavor.textContent = 'You Win! Rock beats scissors.';
        } 
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            playerScore++;
            flavor.textContent = 'You win! Paper covers rock.';
        } else if (computerSelection === 'scissors') {
            computerScore++;
            flavor.textContent = 'You lose! Scissors cut up paper.';
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            computerScore++;
            flavor.textContent = 'You lose! Rock smashes scissors.';
        } else if (computerSelection === 'paper') {
            playerScore++;
            flavor.textContent = 'You win! Scissors cut up paper.';
        }
    }

    scorePlayer.textContent = ` ${playerScore}`;
    scoreComputer.textContent = ` ${computerScore}`;

    chooseComputerImage(computerSelection);
    gameEnd();
}

selection.forEach(button => button.addEventListener('click', playRound));
selection.forEach(button => button.addEventListener('click', choosePlayerImage));
selection.forEach(button => button.addEventListener('click', toggleActive));
vs.addEventListener('transitionend', removeActive);
resetButton.addEventListener('click', refreshPage);