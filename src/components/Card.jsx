import React from "react";

function Card({ card, handleFlip, flipped }) {
  return (
    <div
      className={`relative w-24 h-32 cursor-pointer ${
        flipped ? "flip" : ""
      } transition-transform transform hover:scale-105`}
      onClick={() => handleFlip(card)}
    >
      <div className={`absolute w-full h-full ${flipped ? "" : "bg-white"}`}>
        {flipped ? (
          <img
            src={card.src}
            alt="card"
            className="w-full h-full rounded-lg object-cover shadow-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-400 rounded-lg"></div>
        )}
      </div>
    </div>
  );
}

export default Card;
