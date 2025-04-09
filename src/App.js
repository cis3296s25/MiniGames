import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TicTacToe from "./TicTacToe";
import SnakeGame from "./SnakeGame";
import Hangman from "./Hangman";
import MazeGame from "./MazeGame"

function App() {
  const [game, setGame] = useState(null);

  const play_TicTacToe = (string) => {
    setGame(string);
  }

  const play_Snake = (string) => {
    setGame(string);
  }

  const play_Hangman = (string) => {
    setGame(string);
  }
  
  const play_MazeGame = (string) => {
    setGame(string);
  }

  return (
    <div className="App">
      {game === null ? (
        <div>
          <h1>MiniGames</h1>
          <button className="select-button" onClick={() => play_TicTacToe("ticTacToe")}>Tic-Tac-Toe</button>
          <button className="select-button" onClick={() => play_Snake("snake")}>Snake</button>
          <button className="select-button" onClick={() => play_Hangman("hangman")}>Hangman</button>
          <button className="select-button" onClick={() => play_MazeGame("mazegame")}>Maze</button>
        </div>
      ) : game === 'ticTacToe' ? (
        <TicTacToe setGame={setGame} />
      ) : game === 'snake' ? (
        <SnakeGame setGame={setGame} />
      ) : game === 'hangman' ? (
        <Hangman setGame={setGame} />
      ) : game === 'mazegame' ? (
        <MazeGame setGame={setGame} />
      ) : null}
    </div>
  );
}

export default App;
  