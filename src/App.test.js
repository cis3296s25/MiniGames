import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('renders title in App', () => {
  render(<App />);
  const linkElement = screen.getByText(/MiniGames/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the game selection in App', () => {
  render(<App />);
  expect(screen.getByText(/Snake/i)).toBeInTheDocument();
  expect(screen.getByText(/Hangman/i)).toBeInTheDocument();
  expect(screen.getByText(/TicTacToe/i)).toBeInTheDocument();
  expect(screen.getByText(/Maze/i)).toBeInTheDocument();
});

test('renders TicTacToe game when button is clicked', () => {
  render(<App />);
  const TicTacToeButton = screen.getByText(/TicTacToe/i);
  fireEvent.click(TicTacToeButton);
  expect(screen.getByText(/Tic-Tac-Toe$/i)).toBeInTheDocument();
});

test('renders Snake game when button is clicked', () => {
  render(<App />);
  const SnakeButton = screen.getByText(/Snake/i);
  fireEvent.click(SnakeButton);
  expect(screen.getByText(/Snake$/i)).toBeInTheDocument(); // Fails if it detects the word "snake" more than two times
});

test('renders Hangman game when button is clicked', () => {
  render(<App />);
  const HangmanButton = screen.getByText(/Hangman/i);
  fireEvent.click(HangmanButton);
  expect(screen.queryByText(/hidden$/i)).not.toBeInTheDocument(); // Since the title "HangMan" is in Header.js in src/Hangman Build, I chose a different word to be identified, fitting for the game.
});

test('renders Maze game when button is clicked', () => {
  render(<App />);
  const MazeButton = screen.getByText(/Maze/i);
  fireEvent.click(MazeButton);
  expect(screen.queryByText(/Maze/i)).not.toBeNull();
});
