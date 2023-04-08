const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let currentCard = event.target;
  console.log(currentCard);
  if(currentCard.dataset.flipped) {
    return;
  }

  // assign card 1
  if(!card1) {
    card1 = currentCard;

    // add toggled attribute
    event.target.setAttribute('data-flipped', true);

    // get color value from class name
    const color = event.target.classList.value;

    // set card/div background-color to the color value from click event
    event.target.style.backgroundColor = color;

  }

  // assign card 2 if card 1 exists and check for match
  if(card1 && (currentCard != card1)) {
    card2 = currentCard;
    // add flipped attribute
    event.target.setAttribute('data-flipped', true);

    // get color value from class name
    const color = event.target.classList.value;

    // set card/div background-color to the color value from click event
    event.target.style.backgroundColor = color;

    if (card1.className === card2.className) {
      console.log('its a match');
      card1 = null;
      card2 = null;
      return;
    }

    if (card1.className != card2.className) {
      console.log('no match');
      card1.removeAttribute('data-flipped');
      card2.removeAttribute('data-flipped');
      let divs = document.querySelector('#game');
      console.log(divs);
      divs.style.pointerEvents = 'none';
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1 = null;
        card2 = null;
        divs.style.pointerEvents = 'auto';
      },1000);
    }

  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
