import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TicTacToe from "./TicTacToe";
import SnakeGame from "./SnakeGame";
import Hangman from "./Hangman";
import MazeGame from "./MazeGame"

import tictactoephoto from "./tictactoe.png";
import snakephoto from "./snake.png";
import hangmanphoto from "./hangman.png";


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

          <button className="select-button" onClick={() => play_TicTacToe("ticTacToe")}>
            <div className="button-content">
          <img src={tictactoephoto} className="button-image"/>
          <p>TicTacToe</p>
          </div>
          </button>
          <button className="select-button" onClick={() => play_Snake("snake")}>
            <div className="button-content">
          <img src={snakephoto} className="button-image"/>
          <p>Snake</p>
            </div>
          </button>
          <button className="select-button" onClick={() => play_Hangman("hangman")}>
            <div className="button-content">
          <img src={hangmanphoto} className="button-image"/>
          <p>Hangman</p>
            </div>
          </button>
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
  