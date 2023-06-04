import React, { Component } from "react";
import Deck from "./Deck";

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleStand = this.handleStand.bind(this);
    this.state = {
      deck: [],
      playerHand: [],
      dealerHand: [],
    };
  }

  componentDidMount() {
    const { deck } = this.state;
    this.setState(
      {
        deck: this.createDeck(),
      },
      () => {
        this.dealCards();
      }
    );
  }

  dealCards() {
    const { deck } = this.state;
    const playerHand = [];
    const dealerHand = [];

    playerHand.push(this.drawCard(deck));
    playerHand.push(this.drawCard(deck));
    dealerHand.push(this.drawCard(deck));

    this.setState({
      playerHand,
      dealerHand,
      deck,
    });
  }

  drawCard(deck) {
    const cardIndex = Math.floor(Math.random() * deck.length);
    const card = deck[cardIndex];

    // Remove the drawn card from the deck
    const updatedDeck = [
      ...deck.slice(0, cardIndex),
      ...deck.slice(cardIndex + 1),
    ];

    return card;
  }

  createDeck() {
    const suits = ["♠", "♣", "♥", "♦"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    const deck = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        const card = {
          suit,
          rank,
        };
        deck.push(card);
      }
    }

    return deck;
  }
  calculateHandValue(hand) {
    let sum = 0;
    let numAces = 0;

    for (let card of hand) {
      if (card.rank === "A") {
        numAces++;
      } else if (card.rank === "K" || card.rank === "Q" || card.rank === "J") {
        sum += 10;
      } else {
        sum += parseInt(card.rank);
      }
    }

    for (let i = 0; i < numAces; i++) {
      if (sum + 11 > 21) {
        sum += 1;
      } else {
        sum += 11;
      }
    }

    return sum;
  }
  handleHit = () => {
    const { deck, playerHand } = this.state;
    const newCard = this.drawCard(deck);

    this.setState({
      playerHand: [...playerHand, newCard],
      deck,
    });
  };

  handleStand() {
    const { deck, dealerHand } = this.state;
    let newDealerHand = dealerHand.slice();

    while (this.calculateHandValue(newDealerHand) < 17) {
      const newCard = this.drawCard(deck);
      newDealerHand.push(newCard);
    }

    this.setState(
      {
        dealerHand: newDealerHand,
        deck,
        gameOver: true,
      },
      () => {
        const { playerHand, dealerHand } = this.state;
        const playerHandValue = this.calculateHandValue(playerHand);
        const dealerHandValue = this.calculateHandValue(dealerHand);
        let gameOutcomeMessage = "";

        if (playerHandValue > 21) {
          gameOutcomeMessage = "Player busts. Dealer wins!";
        } else if (dealerHandValue > 21) {
          gameOutcomeMessage = "Dealer busts. Player wins!";
        } else if (playerHandValue === dealerHandValue) {
          gameOutcomeMessage = "It's a tie!";
        } else if (playerHandValue > dealerHandValue) {
          gameOutcomeMessage = "Player wins!";
        } else {
          gameOutcomeMessage = "Dealer wins!";
        }

        this.setState({ gameOutcomeMessage });
      }
    );
  }

  render() {
    const { playerHand, dealerHand, gameOver } = this.state;
    const playerHandValue = this.calculateHandValue(playerHand);
    const dealerHandValue = this.calculateHandValue(dealerHand);
    let gameOutcomeMessage = "";

    if (gameOver) {
      // Determine the game outcome and set the gameOutcomeMessage accordingly
    }

    return (
      <div className="game">
        <h1>Blackjack Game</h1>
        <div>
          <h2>Player Hand ({playerHandValue})</h2>
          <Deck cards={playerHand} />
          <button onClick={this.handleHit}>Hit</button>
          <button onClick={this.handleStand}>Stand</button>
        </div>
        <div>
          <h2>Dealer Hand ({dealerHandValue})</h2>
          <Deck cards={dealerHand} />
        </div>
        {gameOutcomeMessage && <p>{gameOutcomeMessage}</p>}
      </div>
    );
  }
}

export default Game;
