import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TicTacToe from "./TicTacToe";
import SnakeGame from "./SnakeGame";

function App() {
  const [game, setGame] = useState(null);
  return (
    <div className="App">
      <h1>MiniGames</h1>
      {game === null ? (
        <div>
          <button onClick={() => setGame('ticTacToe')}>Tic-Tac-Toe</button>
          <button onClick={() => setGame('snake')}>Snake</button>
        </div>
      ) : game === 'ticTacToe' ? (
        <TicTacToe setGame={setGame}/>
      ) : (
        <SnakeGame setGame={setGame}/>
      )}
    </div>
  );
}

export default App;
  