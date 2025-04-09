import React, { useState, useEffect, useRef } from 'react';
import Maze from './Maze';
import Player from './Player';
import './MazeGame.css';
import './key.png';
import './home.png';

const App = () => {
  const [maze, setMaze] = useState(null);
  const [sprite, setSprite] = useState(null);
  const [finishSprite, setFinishSprite] = useState(null);
  const [difficulty, setDifficulty] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [moves, setMoves] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const loadSprites = () => {
      const spriteImg = new Image();
      spriteImg.src = '/key.png';
      spriteImg.onload = () => setSprite(spriteImg);

      const finishImg = new Image();
      finishImg.src = '/home.png';
      finishImg.onload = () => setFinishSprite(finishImg);
    };

    loadSprites();
  }, []);

  const startGame = () => {
    setGameOver(false);
    setMoves(0); // Reset moves on start

    if (sprite && finishSprite) {
      const newMaze = new Maze(difficulty, difficulty);
      setMaze(newMaze);

      const newPlayer = new Player(newMaze, sprite, finishSprite, setGameOver, setWinMessage, setMoves);
      // Player component isn't directly used in App; we're just passing the parameters here

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      newMaze.drawMaze(ctx);
    }
  };

  useEffect(() => {
    if (sprite && finishSprite) startGame();
  }, [sprite, finishSprite, difficulty]);

  const resetGame = () => {
    startGame();
  };

  return (
    <div className="App">
      <h1>Maze Game</h1>
      <div>
        <button onClick={startGame}>Start Game</button>
        <button onClick={resetGame} disabled={gameOver}>Restart Game</button>
        <div id="mazeCanvasContainer">
          <canvas ref={canvasRef} id="mazeCanvas" width="500" height="500"></canvas>
        </div>
        <div>
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            disabled={gameOver}
          >
            <option value={5}>5x5</option>
            <option value={10}>10x10</option>
            <option value={15}>15x15</option>
          </select>
        </div>
        {gameOver && (
          <div id="Message-Container">
            <div id="message">
              <h2>{winMessage}</h2>
              <button onClick={resetGame}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
