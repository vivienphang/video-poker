// create deck of 52 cards
const createDeck = () => {
  const deck = [];
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const suitsSymbol = ['♥️', '♠️', '♣️', '♦️'];
  const suitsColour = ['red', 'red', 'black', 'black'];
  // const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  for (i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    const currentSymbol = suitsSymbol[i];
    const currentColour = suitsColour[i];

    for (j = 2; j <= 14; j += 1) {
      let cardName = `${j}`;
      if (cardName === '11') cardName = 'J';
      if (cardName === '12') cardName = 'Q';
      if (cardName === '13') cardName = 'K';
      if (cardName === '14') cardName = 'A';
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: j,
        suitSymbol: currentSymbol,
        colour: currentColour,

      };
      deck.push(card);
    }
  }
  return deck;
};

// shuffle the cards, get random index using math.floor method
const getRandomIndex = (max) => Math.floor(Math.random(max) * max);
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let i = 0; i < cards.length; i += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[i];
    // Swap positions of randomCard and currentCard in the deck
    cards[i] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  console.log(cards);
  return cards;
};

const newDeck = createDeck();
shuffleCards(newDeck);
// check 52 shuffled cards
// console.log(newShuffledDeck);

// set max hand length to 5 as we deal only 5 cards
let playerHand = [];

playerHand = newDeck.splice(0, 5);
