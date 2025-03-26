import React, { useState, useEffect, useRef } from "react";
import "./Snakegame.css";

const GameState = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collisionType, setCollisionType] = useState(null);

  const SNAKE_SPEED = 10;
  const [apple, setApple] = useState({ x: 180, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);
  const [direction, setDirection] = useState(null);
  const directionMap = {
    ArrowRight: "right",
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowDown: "down"
  };
  const canvasRef = useRef(null);

  // Handle game over state
  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }

    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
    setSnake([
      { x: 100, y: 50 },
      { x: 95, y: 50 },
    ]);
    setDirection(null);
    setApple({ x: 180, y: 100 });
  };

  // Handling key press to reset the game
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  // Game logic inside a useEffect to handle snake movement and collisions
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return; // Ensure canvas is available before trying to get the context
    const ctx = canvas.getContext("2d");

    const drawSnake = () => {
      snake.forEach((snakePart) => {
        ctx.beginPath();
        ctx.rect(snakePart.x, snakePart.y, 14, 14);
        ctx.fillStyle = "#90EE90";
        ctx.fill();
        ctx.closePath();
      });
    };

    const drawApple = () => {
      ctx.beginPath();
      ctx.rect(apple.x, apple.y, 14, 14);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    };

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };
    
          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }
    
          switch (direction) {
            case "right":
              snakeHead.x += SNAKE_SPEED;
              break;
            case "left":
              snakeHead.x -= SNAKE_SPEED;
              break;
            case "up":
              snakeHead.y -= SNAKE_SPEED;
              break;
            case "down":
              snakeHead.y += SNAKE_SPEED;
              break;
            default:
              break;
          }
    
          newSnake[0] = snakeHead;

          // Handle apple, wall, and body collisions
          handleAppleCollision(newSnake);
          handleWallCollision(snakeHead);
          handleBodyCollision(newSnake);

          return newSnake;
        });
      }
    };

    const handleWallCollision = (snakeHead) => {
      if (snakeHead.x + SNAKE_SPEED > canvas.width || snakeHead.x + SNAKE_SPEED < 0) {
        handleGameOver("wall");  // Changed to use handleGameOver instead of onGameOver
      }
      if (snakeHead.y + SNAKE_SPEED > canvas.height || snakeHead.y + SNAKE_SPEED < 0) {
        handleGameOver("wall");  // Changed to use handleGameOver instead of onGameOver
      }
    };

    const handleBodyCollision = (newSnake) => {
      const snakeHead = newSnake[0];
      for (let i = 1; i < newSnake.length; i++) {
        if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
          handleGameOver("self");  // Changed to use handleGameOver instead of onGameOver
        }
      }
    };

    const handleAppleCollision = (newSnake) => {
      const snakeHead = newSnake[0];

      if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
        setScore(score + 1);

        setApple({
          x:
            Math.floor((Math.random() * canvas.width) / SNAKE_SPEED) *
            SNAKE_SPEED,
          y:
            Math.floor((Math.random() * canvas.height) / SNAKE_SPEED) *
            SNAKE_SPEED,
        });
        const newLength = 3;
        for (let i = 0; i < newLength; i++) {
          newSnake.push({
            x: newSnake[newSnake.length - 1].x,
            y: newSnake[newSnake.length - 1].y,
          });
        }
      }
    };

    const handleKeyPress = (e) => {
      const newDirection = directionMap[e.key];
      if (newDirection && newDirection !== getOppositeDirection(direction)) {
        setDirection(newDirection);
      }
    };

    const getOppositeDirection = (currentDirection) => {
      switch (currentDirection) {
        case "right":
          return "left";
        case "left":
          return "right";
        case "up":
          return "down";
        case "down":
          return "up";
        default:
          return null;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApple();
      moveSnake();
    }, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [snake, direction, apple]);

  return (
    <div className="game-container">
      <p className="score">Score: {score}</p>
      <p className="high-score">High Score: {highScore}</p>
      {gameOver && (
        <div className="game-over">
          <p>Game Over! {collisionType === "wall" ? "You Hit the wall" : "You Ate yourself"}!</p>
          <p>Press Enter to reset the game.</p>
        </div>
      )}
      {!gameOver && (
        <div>
          <canvas className="gameCanvas" ref={canvasRef} width={750} height={420} />
        </div>
      )}
    </div>
  );
};

export default GameState;
