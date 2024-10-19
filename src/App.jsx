import React from 'react';
import TicTacToe from './pages/TicTacToe';
import MemoryGame from './pages/MemoryGame';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
    //   <h1 className="text-4xl font-bold mb-6 text-indigo-600">Welcome to the Tic Tac Toe Game</h1>
    //   <a href="/tic-tac-toe" className="text-xl text-white bg-indigo-600 py-2 px-4 rounded">Play Tic Tac Toe</a>
    // </div>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TicTacToe" element={<TicTacToe />} />
        <Route path="/MemoryGame" element={<MemoryGame />} />
      </Routes>
  );
}

export default App;
