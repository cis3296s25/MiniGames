import React, { useState, useEffect, useRef } from 'react';
import Maze from './Maze';
import Player from './Player';
import './MazeGame.css';
import keyImage from './key.png';
import homeImage from './home.png';

const MazeGame = () => {
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
      spriteImg.src = keyImage;
      spriteImg.onload = () => setSprite(spriteImg);

      const finishImg = new Image();
      finishImg.src = homeImage;
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

        {maze && sprite && finishSprite && (
          <Player
            maze={maze}
            sprite={sprite}
            finishSprite={finishSprite}
            setGameOver={setGameOver}
            setWinMessage={setWinMessage}
            moves={moves}
            setMoves={setMoves}
          />
        )}

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

export default MazeGame;
