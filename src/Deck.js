import React from "react";
import Card from "./Card";

const Deck = ({ cards }) => {
  return (
    <div className="deck">
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} rank={card.rank} />
      ))}
    </div>
  );
};

export default Deck;
