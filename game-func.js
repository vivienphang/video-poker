/*
************************** BUTTONS: BETS AND POINTS *****************************
*/

// Game starts with 100 points and bet at 1 point
let points = 100;
let bet = 1;

let rankTally = {};
let suitsTally = {};

const buttonContainer = document.getElementById('button-container');
const redrawButton = document.createElement('button');
redrawButton.classList.add('redraw-button');
redrawButton.innerText = 'REDRAW';

buttonContainer.append(redrawButton);

// Update point system when bet amount is adjusted
const pointElement = document.getElementById('starting-points');
pointElement.innerHTML = (`${points} <br> POINTS`);

// Player places bet
const betBtn = document.getElementById('starting-bet');
betBtn.innerHTML = (`BET: ${bet}`);

// const updatePoints = '';

// Player increases bet button
// Bet loops from 1 to 5 only
const betIncrement = () => {
  bet += 1;
  if (bet > 5) {
    bet = 1; // if bet goes over 5, bet goes back to 1 and re-loop
  }
  setPointsWithMultiple();
  // Prints incremental bet onto button -> betBtn
  betBtn.innerHTML = (`BET: ${bet}`);
};
betBtn.addEventListener('click', betIncrement);

/*
************************** BUTTONS: DEAL AND REDRAW ******************************
*/

// Make board element global var
const boardElement = document.getElementById('deck');

// Create message board
const messageBoard = document.getElementById('game-message');
messageBoard.innerHTML = 'Click DEAL to start!';

// Display 5 cards
const displayCard = () => {
  points -= bet;
  pointElement.innerHTML = (`${points} <br> POINTS`);
  boardElement.innerHTML = '';
  if (playerHand.length === 0) {
    playerHand = newDeck.splice(0, 5);
  }
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `${playerHand[i].name} <br> <br> ${playerHand[i].suitSymbol}`;
    cardElement.addEventListener('click', () => {
      console.log(cardElement);
      handleCardClick(cardElement, i);
    });
    messageBoard.innerHTML = 'Select cards to swap and click REDRAW';
    boardElement.appendChild(cardElement);
  }
  dealBtn.disabled = true;
  redrawButton.disabled = false;
  betBtn.disabled = true;
};

// Activate Deal button click
const dealBtn = document.getElementById('deal');
dealBtn.addEventListener('click', displayCard);

// Swap out clicked cards by making playerHand's card an object
const cardSwap = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};
const handleCardClick = (cardElement, i) => {
  if (cardSwap[i] === false) {
    // Add "selected" class here
    cardElement.classList.add('selected');
    cardSwap[i] = true;
  } else {
    // Remove "selected" class here
    cardElement.classList.remove('selected');
    cardSwap[i] = false;
  }
};

/*
**************************** WIN CONDITIONS *********************************
*/

// Create list of possible win conditions and payouts
const handConditions = {
  'Straight Flush': 50, //= === 5 same suit + 5 sequential order
  'Four of a Kind': 25, //= === 4 same rank
  'Full House': 9, //= ======== 3 same rank + 2 same other rank
  Flush: 6, // ================ 5 same suit
  Straight: 4, // ============= 5 sequential order
  'Three of a Kind': 3, // ==== 3 same rank
  'Two Pairs': 2, // ========== 2 same rank + 2 other same rank
};
// helper function to tally ranks
const tallyRanks = () => {
  // Loop over hand
  for (i = 0; i < playerHand.length; i += 1) {
    const cardRank = playerHand[i].rank; // cardRank = 6
    // If there is a tally, increment its count
    if (cardRank in rankTally) {
      rankTally[cardRank] += 1;
    } // Else, initialise count of this card name to 1
    else {
      rankTally[cardRank] = 1;
    }
    // console.log(`There are ${rankTally[cardRank]} of ${cardRank}s in the hand`);
  }
};

// helper function to tally suits
const tallySuits = () => {
  // Loop over hand
  for (i = 0; i < playerHand.length; i += 1) {
    const cardSuits = playerHand[i].suitSymbol;
    // console.log(cardSuits);
    // If there is a tally, increment its count
    if (cardSuits in suitsTally) {
      suitsTally[cardSuits] += 1;
    } // Else, initialise count of this card name to 1
    else {
      suitsTally[cardSuits] = 1;
    }
    // console.log(suitsTally);
  }
};

// Hand for four of a kind: 2, 2, 2, 2, 5
// key: values
// 2 : 4
// 5 : 1
const isFourOfAKind = () => {
  if (Object.values(rankTally).length === 2
    && (Object.values(rankTally)[0] === 4 || Object.values(rankTally)[0] === 1)
    && (Object.values(rankTally)[1] === 4 || Object.values(rankTally)[1] === 1)
  ) {
    // console.log('It\'s four of a kind!');
    return 'isFourOfAKind';
  }
  return false;
};

const isFlush = () => {
  // what is a flush?
  // 5 cards same suit!
  // this means, only one suit (key), 5 times (value)
  // ace: 5
  // console.log(suitsTally);
  if (Object.values(suitsTally)[0] === 5) {
    return true;
  }
  return false;
};

// Straight
// 1. To get sequential order: Use sort.() method
//    Then use if statement:
// 2. Last index minus first index === 4 &&
const isStraight = () => {
  const sortedCards = playerHand.sort((a, b) => a.rank - b.rank);
  // console.log(Object.values(rankTally));
  if (sortedCards[4].rank - sortedCards[0].rank === 4 && Object.values(rankTally).length === 5) {
    // console.log('Straight win!');
    return true;
  }
  return false;
};

// Three of a kind
// 2: 3
// 4: 1
// 9: 1
const isThreeOfAKind = () => {
  if (Object.values(rankTally).length === 3
  && (Object.values(rankTally)[0] === 3 || Object.values(rankTally)[0] === 1)
  && (Object.values(rankTally)[1] === 3 || Object.values(rankTally)[1] === 1)
  && (Object.values(rankTally)[2] === 3 || Object.values(rankTally)[2] === 1)
  ) {
    return 'isThreeOfAKind';
  }
  return false;
};

// Hand for two pair: 2, 3, 3, 6, 6
// 2: 2
// 3: 2
// 6: 1
const isTwoPairs = () => {
  if (Object.values(rankTally).length === 3
  && (Object.values(rankTally)[0] === 2 || Object.values(rankTally)[0] === 1)
  && (Object.values(rankTally)[1] === 2 || Object.values(rankTally)[1] === 1)
  && (Object.values(rankTally)[2] === 2 || Object.values(rankTally)[2] === 1)
  ) {
    return 'isTwoPair';
  }
  return false;
};

// how do you want to check whether you win?
// runs from best hand to lousiest hand

const checkWin = () => {
  suitsTally = {};
  rankTally = {};
  playerHand = [
    { name: '9', suit: 'diamond', rank: 9 },
    { name: '9', suit: 'diamond', rank: 9 },
    { name: '9', suit: 'diamond', rank: 9 },
    { name: '9', suit: 'diamond', rank: 9 },
    { name: 'K', suit: 'diamond', rank: 13 },
  ];
  tallyRanks(playerHand);
  tallySuits(playerHand);

  let output;
  const straightState = isStraight();
  const flushState = isFlush();
  const fourState = isFourOfAKind(rankTally);
  const threeState = isThreeOfAKind(rankTally);
  const pairCount = isTwoPairs(rankTally);

  console.log(straightState);
  console.log(flushState);

  if (straightState && flushState) {
    output = `STRAIGHT FLUSH. + ${handConditions['Straight Flush'] * bet} to your points!`;
    points += handConditions['Straight Flush'] * bet;
  } else if (fourState) {
    output = `FOUR OF A KIND. + ${handConditions['Four of a Kind'] * bet} to your points!`;
    points += handConditions['Four of a Kind'] * bet;
  } else if (threeState && pairCount === 1) {
    output = `FULL HOUSE'. + ${handConditions['Full House'] * bet} to your points!`;
    points += handConditions['Full House'] * bet;
  } else if (flushState) {
    output = `FLUSH. + ${handConditions.Flush * bet} to your points!`;
    points += handConditions.Flush * bet;
  } else if (straightState) {
    output = `STRAIGHT. + ${handConditions.Straight * bet} to your points!`;
    points += handConditions.Straight * bet;
  } else if (threeState) {
    output = `THREE OF A KIND. + ${handConditions['Three of a Kind'] * bet} to your points!`;
    points += handConditions['Three of a Kind'] * bet;
  } else if (pairCount) {
    output = `TWO PAIRS. + ${handConditions['Two Pairs'] * bet} to your points!`;
    points += handConditions['Two Pairs'] * bet;
  } else {
    output = 'Nice try!';
    points -= bet;
  }
  output += '<br> Click DEAL to play again.';
  pointElement.innerHTML = (`${points} <br> POINTS`);
  dealBtn.disabled = false;
  betBtn.disabled = false;
  playerHand = [];
  return output;
};
// Putting back the swapped cards
const redrawCards = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    if (cardSwap[i] === true) {
      playerHand.splice(i, 1, newDeck.pop());
    }
  }
  displayCard();
  messageBoard.innerHTML = checkWin();
  redrawButton.disabled = true;
};
redrawButton.addEventListener('click', redrawCards);

// Create function to calculate hand conditions
const setPointsWithMultiple = () => {
  const payoutContainer = document.getElementById('payout-container');
  payoutContainer.innerHTML = '';

  Object.keys(handConditions).forEach((key) => {
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    const scoreKey = document.createElement('p');
    const scoreValue = document.createElement('p');
    scoreKey.innerHTML = key;
    scoreValue.innerHTML = handConditions[key] * bet;
    scoreContainer.appendChild(scoreKey);
    scoreContainer.appendChild(scoreValue);
    payoutContainer.appendChild(scoreContainer);
  });
};
setPointsWithMultiple();
