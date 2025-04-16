import React, { useState, useEffect, useCallback } from 'react';
import Header from './Hangman Build/Header';
import Figure from './Hangman Build/Figure';
import WrongLetters from './Hangman Build/WrongLetters';
import Word from './Hangman Build/Word';
import Popup from './Hangman Build/Popup';
import Notification from './Hangman Build/Notification';
import Hint from './Hangman Build/Hint';
import { showNotification as show, checkWin } from './Hangman Build/Helpers';

import './Hangman.css';

function Hangman({setGame}) {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState(""); 
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    fetch("nouns.txt")
      .then(response => response.text())
      .then(text => {
        const words = text.split(/\s+/);
        const randomWord = words[Math.floor(Math.random() * words.length)]; 
        setSelectedWord(randomWord); 
      })
      .catch(error => {
        console.error("Error fetching the file:", error);
      });
  }, []);


  const handleKeydown = useCallback((event) => {
    const { key, keyCode } = event;
    if (playable && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();
      if (selectedWord.includes(letter)) {
        setCorrectLetters(prev => {
          if (!prev.includes(letter)) return [...prev, letter];
          show(setShowNotification);
          return prev;
        });
      } else {
        setWrongLetters(prev => {
          if (!prev.includes(letter)) return [...prev, letter];
          show(setShowNotification);
          return prev;
        });
      }
    }
  }, [playable, selectedWord]); // only depend on things that are needed
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  function playAgain() {
    setResetGame(true); 

    fetch("nouns.txt")
    .then(response => response.text())
    .then(text => {
      const words = text.split(/\s+/);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSelectedWord(randomWord); 
    })
    .catch(error => {
      console.error("Error fetching the file:", error);
    });
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);
  }

  return (
    <>
      <Header />
      <div className="hangman-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Hint selectedWord={selectedWord} correctLetters={correctLetters} resetGame={resetGame} setResetGame={setResetGame} />       
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
      <button className="back-button" onClick={() => setGame(null)}>Back to MiniGames</button>
    </>
  );
}

export default Hangman;