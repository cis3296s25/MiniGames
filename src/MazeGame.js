import React, { useState, useEffect, useRef } from 'react';
import Maze from './Maze';
import Player from './Player';
import './MazeGame.css';
import keyImage from './key.png';
import homeImage from './home.png';

const MazeGame = ({setGame}) => {
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
      <button className="back-button" onClick={() => setGame(null)}>
        Back to MiniGames
      </button>
      
      
        <div className="instructions">
          <h2>How to Play:</h2>
          <p>1. Use the arrow keys to move the key (represented by the sprite) around the maze.</p>
          <p>2. Your goal is to reach the home (represented by the finish sprite) while avoiding walls.</p>
          <p>3. The number of moves is tracked at the top right corner.</p>
          <p>4. The game ends when you reach the home. Try to complete the maze with as few moves as possible!</p>
          <p>5. You can only choose the Difficulty of the maze after restarting the game.</p>
        </div>
         
      <div className="controls">
        <div className="button">
          <button onClick={startGame}>Restart Game</button>
          <button onClick={resetGame} disabled={gameOver}>Generate Maze</button>
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
  );
};


export default MazeGame;
