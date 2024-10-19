import React, { useState, useEffect } from "react";
import Card from "../components/Card"; // Import the Card component
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import "../index.css"
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";




const cardImages = [
  { src:img1, matched: false },
  { src:img2, matched: false },
  { src: img3, matched: false },
  { src: img4, matched: false },
  { src: img5, matched: false },
  { src: img6, matched: false },
 
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards and start the game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setFlippedCards([]);
  };

  const handleFlip = (card) => {
    if (!disabled && !flippedCards.includes(card)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisabled(true);
      if (flippedCards[0].src === flippedCards[1].src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === flippedCards[0].src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [flippedCards]);

  const resetTurn = () => {
    setFlippedCards([]);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-500 to-purple-700">
      <h1 className="text-black text-4xl font-bold mb-8">Memory Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleFlip={handleFlip}
            flipped={flippedCards.includes(card) || card.matched}
          />
        ))}
      </div>
      <button
        onClick={shuffleCards}
        className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
      >
        Restart Game
      </button>
    </div>
  );
}

export default MemoryGame;
