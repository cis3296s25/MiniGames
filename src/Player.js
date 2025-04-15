import React, { useEffect, useRef, useState } from 'react';

// const CELL_SIZE = 500; // canvas width in px
const Player = ({ maze, sprite, finishSprite, setGameOver, setWinMessage, moves, setMoves }) => {
  const canvas = document.getElementById('mazeCanvas');
  const ctx = canvas?.getContext('2d');
  const [position, setPosition] = useState(maze.getStartCoord());

  const draw = (x, y) => {
    if (!ctx || !sprite || !finishSprite || !maze) return;

    const cellSize = canvas.width / maze.getMap().length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze.drawMaze(ctx);

    // Draw goal
    const end = maze.getEndCoord();
    ctx.drawImage(finishSprite, end.x * cellSize, end.y * cellSize, cellSize, cellSize);

    // Draw player
    ctx.drawImage(sprite, x * cellSize, y * cellSize, cellSize, cellSize);
  };

    // Reposition the player when changing difficulty
    useEffect(() => {
        if (maze) {
            setPosition(maze.getStartCoord());
        }
    },[maze]);

  useEffect(() => {
    draw(position.x, position.y);
  }, [position, sprite, finishSprite, maze]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        event.preventDefault();
        const { x, y } = position;
        const map = maze.getMap();
        const cell = map[y][x];
        let newX = x;
        let newY = y;
      
        if (event.key === 'ArrowLeft' && cell.w) {
          newX = x - 1;
        }
        if (event.key === 'ArrowUp' && cell.n) {
          newY = y - 1;
        }
        if (event.key === 'ArrowRight' && cell.e) {
          newX = x + 1;
        }
        if (event.key === 'ArrowDown' && cell.s) {
          newY = y + 1;
        }
      
        if (newX !== x || newY !== y) {
          setPosition({ x: newX, y: newY });
          setMoves((prev) => {
            const updated = prev + 1;
      
            if (
              newX === maze.getEndCoord().x &&
              newY === maze.getEndCoord().y
            ) {
              setGameOver(true);
              setWinMessage(`You won the game in ${updated} moves!`);
            }
      
            return updated;
          });
        }
      };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, maze, setMoves, setGameOver, setWinMessage]);

  return null;
};

export default Player;
