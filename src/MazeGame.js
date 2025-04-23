import React, { useState, useEffect, useRef } from 'react';
import Maze from './Maze';
import Player from './Player';
import './MazeGame.css';
import keyImage from './Images/key.png';
import homeImage from './Images/home.png';

const MazeGame = ({ setGame }) => {
  const [maze, setMaze] = useState(null);
  const [sprite, setSprite] = useState(null);
  const [finishSprite, setFinishSprite] = useState(null);
  const [difficulty, setDifficulty] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [moves, setMoves] = useState(0);

  const canvasRef = useRef(null);
  const playerRef = useRef(null); // New ref for Player component

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

  const generateNewMaze = () => {
    if (sprite && finishSprite) {
      const newMaze = new Maze(difficulty, difficulty);
      setMaze(newMaze);

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      newMaze.drawMaze(ctx);

      setMoves(0);
      setGameOver(false);
    }
  };

  const resetGame = () => {
    if (maze) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      maze.drawMaze(ctx);

      setMoves(0);
      setGameOver(false);

      if (playerRef.current) {
        playerRef.current.reset(); // Reset the player
      }
    }
  };

  useEffect(() => {
    if (sprite && finishSprite) generateNewMaze();
  }, [sprite, finishSprite, difficulty]);

  return (
    <div className="App">
      <h1>Maze Game</h1>
      <button className="back-button" onClick={() => setGame(null)}>
        Back to MiniGames
      </button>

      <div className="instructions">
        <h2>How to Play:</h2>
        <p>1. Use the arrow keys to move the key (sprite) around the maze.</p>
        <p>2. Reach the home icon (finish sprite).</p>
        <p>3. Your move count is shown at the top.</p>
        <p>4. Complete the maze with as few moves as possible!</p>
      </div>

      <div className="controls">
        <div className="button">
          <button onClick={resetGame}>Restart Game</button>
          <button onClick={generateNewMaze} disabled={gameOver}>Generate Maze</button>
        </div>

        <div className="difficulty-select">
          <label htmlFor="difficulty">Difficulty: </label>
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

        <div className="move-counter">
          <p>
            Moves: <strong>{moves}</strong>
          </p>
        </div>
      </div>

      <div id="mazeCanvasContainer">
        <canvas ref={canvasRef} id="mazeCanvas" width="500" height="500"></canvas>
      </div>

      {maze && sprite && finishSprite && (
        <Player
          ref={playerRef}
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
            <button onClick={generateNewMaze}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MazeGame;
