import React from "react";

const Card = ({ suit, rank }) => {
  return (
    <div className="card">
      <span className="rank">{rank}</span>
      <span className="suit">{suit}</span>
    </div>
  );
};

export default Card;
