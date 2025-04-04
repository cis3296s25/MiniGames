import React, { useState, useEffect } from 'react';
import Header from './Hangman Build/Header';
import Figure from './Hangman Build/Figure';
import WrongLetters from './Hangman Build/WrongLetters';
import Word from './Hangman Build/Word';
import Popup from './Hangman Build/Popup';
import Notification from './Hangman Build/Notification';
import { showNotification as show, checkWin } from './Hangman Build/Helpers';

import './Hangman.css';

const words = ['application', 'programming', 'interface', 'wizard', 'hall', 'salt', 'cushion', 'scientific', 'partner', 'acrid', 'crowd', 'detail', 'subdue', 'needle', 'squirrel', 'unruly', 'narrow', 'preserve', 'clever', 'shave', 'rinse', 'nest', 'quarter', 'ripe', 'paddle', 'obedient', 'precious'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Hangman() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default Hangman;