import React, { useEffect, useState } from 'react';
import "./TicTacToe.css";
const TicTacToe = ({setGame}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const winner = calculateWinner(board);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }
  useEffect(() =>{
    const handleKeyPress = (event) =>{
      if(event.key === 'Enter'){
        event.preventDefault();
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return ()=>{
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <p>Winner: {winner}</p>}
      <p>Press Enter to restart!</p>
      <button onClick={() => setGame(null)}>Back to MiniGames</button>
    </div>
  );
};

export default TicTacToe;
