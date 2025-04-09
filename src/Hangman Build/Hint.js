import React, { useState, useEffect } from 'react'

const Hint = ({ selectedWord, correctLetters, resetGame, setResetGame}) => {
  const [hint, setHint] = useState(null);
  const [index, setIndex] = useState(null);
  const [isHintUsed, setIsHintUsed] = useState(false);

  const revealHint = () => {
    for (let i = 0; i < selectedWord.length; i++) {
      if (!correctLetters.includes(selectedWord[i])) {
        setHint(selectedWord[i]);
        setIndex(i+1);
        setIsHintUsed(true);
        break;
      }
    }
  };

  useEffect(() => {
    if (resetGame) {
      setHint(null); 
      setIsHintUsed(false); 
      setResetGame(false);
    }
  }, [resetGame]); 

  return (
    <div>
    <button onClick={revealHint} disabled={isHintUsed}>Get Hint</button>
    {hint && <p>Letter {index} is "{hint}"</p>}
    </div>
  )    
}
export default Hint;