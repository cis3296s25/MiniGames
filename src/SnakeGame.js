import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const head = snake[0];
    let newHead;

    if (direction === 'RIGHT') newHead = [head[0] + 1, head[1]];
    if (direction === 'LEFT') newHead = [head[0] - 1, head[1]];
    if (direction === 'UP') newHead = [head[0], head[1] - 1];
    if (direction === 'DOWN') newHead = [head[0], head[1] + 1];

    const newSnake = [newHead, ...snake.slice(0, snake.length - 1)];
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      newSnake.push(snake[snake.length - 1]);
      setFood([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
    }

    if (newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver]);

  return (
    <div>
      <h2>Snake Game</h2>
      {gameOver ? (
        <p>Game Over!</p>
      ) : (
        <div className="game-board">
          {Array.from({ length: 10 }).map((_, y) => (
            <div key={y} className="row">
              {Array.from({ length: 10 }).map((_, x) => {
                const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
                const isFood = food[0] === x && food[1] === y;
                return (
                  <div
                    key={x}
                    className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
