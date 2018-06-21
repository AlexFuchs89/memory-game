// VARIABLES

let cardSymbols = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube",
];
let table = document.querySelector(".deck");
let openedCards = [];
let moves = 0;
let countMoves = document.querySelector(".moves");
let finalStars = document.querySelector(".stars");
let star = '<li><i class="fa fa-star"></i></li>';
let resetButton = document.querySelector(".restart");
let matched = [];
let gameOn = true;
let timeIsTicking = true;
const clock = document.querySelector(".clock");
let totalTime = 0;
let liveTimer, minutes, seconds;
let popUp = document.querySelector(".done-container");
let popupTime = document.getElementById("scored-time");
let popupStars = document.getElementById("scored-stars");
let playAgain = document.getElementById("play-again");

newGame();

// reset button during game

resetButton.addEventListener("click", function() {
  reset();
  });

// play again after completed game

playAgain.addEventListener("click", function() {
  reset();
  });

// FUNCTIONS

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    } return array;
  }

function newGame() {
    // invisible score card 
    popUp.style.display = "none";
    gameOn = true;
    shuffle(cardSymbols);
    for (let i = 0; i < cardSymbols.length; i++) {
        // create list of cards
        const listOfCards = document.createElement('li');
        // add styles of cards
        listOfCards.classList.add('card');
        // add icons from icon array
        listOfCards.innerHTML = `<i class="${cardSymbols[i]}"></i>`;
        // add list of cards to table
        table.appendChild(listOfCards);
        // add click listeners to cards
        listOfCards.addEventListener('click', playing);
        }
    }

function playing() {
    // if a card is already open, open one more and compare them
      if (openedCards.length === 1) {
        this.classList.add("open", "show", "disable");
        // Add the clicked card to the `openedCards` array
        openedCards.push(this);
        // Pass the 1st and 2nd card to be compared
        compare(openedCards[0], openedCards[1]);
        moves++;
        countMoves.textContent = moves;
        rating();
        // check if game is finished
        setTimeout(function() {
          if (matched.length === 16) {
            // if finished, display pop-up
            popUp.style.display = "flex";
            popupTime.innerHTML = `<i>Your time was:</i> <br> ${minutes} : ${seconds}`;
            popupStars.innerHTML = finalStars.innerHTML;
            gameOn = false;
            clearInterval(liveTimer);
          }
        }, 400);
        // if no cards are open, we just open one
        } else if (openedCards.length === 0) {
        this.classList.add("open", "show", "disable");
        rating();
        openedCards.push(this);
        if (timeIsTicking) {
          timer();
          timeIsTicking = false;
          }
        }
     }
  
// reset

function reset() {
  openedCards = [];
  matched = [];
  // deleting all cards
  table.innerHTML = "";  
  // reset moves
  moves = 0;
  countMoves.innerHTML = moves;
  // reset stars
  finalStars.innerHTML = star + star + star;
  // stop timer
  clearInterval(liveTimer);
  timeIsTicking = true;
  totalTime = 0;
  clock.innerHTML = `0 : 0`;
  newGame();
  }

// timer
// TODO: add zero when less than 10, to always have two digits

function timer() {
  clock.innerHTML = `0 : 0`;
  popupTime.textContent = `0 : 0`;
  // Increase the totalTime
  liveTimer = setInterval(function() {
    totalTime += 1;
    // hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor((totalTime / 60) % 60);
    seconds = totalTime % 60;
    // Update the `clock`
    clock.innerHTML = `${minutes} : ${seconds}`;
    popupTime.innerHTML = `${minutes} : ${seconds}`;
    }, 1000);
  }

// display number of stars

function rating() {
  switch (gameOn) {
    case moves > 20:
      finalStars.innerHTML = star;
      break;
    case moves > 14:
      finalStars.innerHTML = star + star;
      break;
    default:
      finalStars.innerHTML = star + star + star;
    }
  }

// comparing two open cards

function compare(firstCard, secondCard) {
  if (firstCard.innerHTML === secondCard.innerHTML) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matched.push(firstCard, secondCard);
    openedCards = [];
    } else {
    setTimeout(function() {
      // just close the cards by default, after a delay
      firstCard.classList.remove("open", "show", "disable");
      secondCard.classList.remove("open", "show", "disable");
      openedCards = [];
      }, 700);
    }
  }

/*
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}
*/
