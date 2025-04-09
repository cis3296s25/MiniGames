import React, { useEffect } from 'react';

const Player = ({ maze, sprite, finishSprite, setGameOver, setWinMessage, moves, setMoves }) => {
  const [position, setPosition] = React.useState(maze.getStartCoord());

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newPosition = { ...position };
      const { x, y } = position;

      // Handle movement based on key codes
      if (event.keyCode === 37) newPosition.x = x - 1; // left
      if (event.keyCode === 38) newPosition.y = y - 1; // up
      if (event.keyCode === 39) newPosition.x = x + 1; // right
      if (event.keyCode === 40) newPosition.y = y + 1; // down

      // Check for valid movement (within bounds and not a wall)
      if (maze.getMap()[newPosition.y] && maze.getMap()[newPosition.y][newPosition.x]) {
        const cell = maze.getMap()[newPosition.y][newPosition.x];
        if (cell) {
          setPosition(newPosition);
          setMoves((prev) => prev + 1);  // Increment the move count

          // Check if player reached the end
          if (newPosition.x === maze.getEndCoord().x && newPosition.y === maze.getEndCoord().y) {
            setGameOver(true);
            setWinMessage(`You won the game in ${moves + 1} moves!`);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, maze, moves, setMoves, setGameOver, setWinMessage]);

  return <></>;
};

export default Player;
