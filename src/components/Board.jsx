import React, { useState, useEffect } from 'react';
import Square from './Square';

function Board({ gameMode, difficulty }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    if (!isXNext && gameMode === 'vs-computer') {
      if (difficulty === 'easy') {
        makeRandomMove();
      } else if (difficulty === 'hard') {
        makeOptimalMove();
      }
    }
  }, [isXNext]);

  const makeRandomMove = () => {
    const emptySquares = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptySquares.length > 0) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const newSquares = squares.slice();
      newSquares[randomIndex] = 'O';
      setSquares(newSquares);
      setIsXNext(true);
    }
  };

  const makeOptimalMove = () => {
    const bestMove = getBestMove(squares);
    const newSquares = squares.slice();
    newSquares[bestMove] = 'O';
    setSquares(newSquares);
    setIsXNext(true);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Reset Game
      </button>
    </div>
  );
}

// Minimax Algorithm for hard difficulty
function getBestMove(squares) {
  const aiPlayer = 'O';
  const humanPlayer = 'X';

  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (calculateWinner(squares)) return null;

  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < emptySquares.length; i++) {
    let move = emptySquares[i];
    squares[move] = aiPlayer;
    let score = minimax(squares, 0, false);
    squares[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (!squares.includes(null)) return 0;

  const aiPlayer = 'O';
  const humanPlayer = 'X';
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < emptySquares.length; i++) {
      let move = emptySquares[i];
      squares[move] = aiPlayer;
      let score = minimax(squares, depth + 1, false);
      squares[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < emptySquares.length; i++) {
      let move = emptySquares[i];
      squares[move] = humanPlayer;
      let score = minimax(squares, depth + 1, true);
      squares[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
