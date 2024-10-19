import React, { useState } from 'react';
import Board from '../components/Board';
import CanvasBackground from '../components/Matrix';

function TicTacToe() {
  const [gameMode, setGameMode] = useState('2-player');
  const [difficulty, setDifficulty] = useState('easy');

  const handleModeChange = (e) => setGameMode(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background animation */}
      <CanvasBackground />

      {/* Tic-Tac-Toe game content */}
      <div className="absolute top-0 right-[38%] z-10 flex flex-col items-center justify-start pt-12">
        <div className="bg-black border-4 border-indigo-500 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-white text-center">Tic Tac Toe</h1>

          <div className="mb-4">
            <label className="mr-2">Select Game Mode:</label>
            <select
              value={gameMode}
              onChange={handleModeChange}
              className="px-2 py-1 border rounded"
            >
              <option value="2-player">2-Player</option>
              <option value="vs-computer">User vs Computer</option>
            </select>
          </div>

          {gameMode === 'vs-computer' && (
            <div className="mb-4">
              <label className="mr-2">Difficulty:</label>
              <select
                value={difficulty}
                onChange={handleDifficultyChange}
                className="px-2 py-1 border rounded"
              >
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          )}

          {/* Tic-Tac-Toe Board */}
          <Board gameMode={gameMode} difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
