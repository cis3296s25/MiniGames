import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TicTacToe from "./TicTacToe";
import SnakeGame from "./SnakeGame";
import Hangman from "./Hangman"

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

  return (
    <div className="App">
      {game === null ? (
        <div>
          <h1>MiniGames</h1>
          <button className="select-button" onClick={() => play_TicTacToe("ticTacToe")}>
            <div className="button-content">
          <img src="/tictactoe.png" className="button-image"/>
          <p>TicTacToe</p>
          </div>
          </button>

          <button className="select-button" onClick={() => play_Snake("snake")}>
            <div className="button-content">
                <img src="/snake.png" className="button-image"/>
              <p>Snake</p>
            </div>
          </button>


          <button className="select-button" onClick={() => play_Hangman("hangman")}>
            <div className="button-content">
              <img src="/hangman.png" className="button-image"/>
              <p>Hangman</p>
            </div>

          </button>


        </div>
      ) : game === 'ticTacToe' ? (
        <TicTacToe setGame={setGame}/>
      ) : game === 'snake' ? (
        <SnakeGame setGame={setGame}/>
      ) : (
        <Hangman setGame={setGame}/>
      )}
    </div>
  );
}

export default App;
  