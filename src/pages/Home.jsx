import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";

function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to="/TicTacToe">
                <button className="play-btn">Play Tic Tac Toe</button>
            </Link>
            <Link to="/MemoryGame">
            <button className="play-btn">Play Memory Game</button>
            </Link>
        </>
    );
}

export default Home;
