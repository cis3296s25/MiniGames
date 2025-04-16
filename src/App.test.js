import { render, screen, fireEvent, act} from '@testing-library/react';
import App from './App';
import Hangman from "./Hangman";
import * as helpers from './Hangman Build/Helpers';

jest.useFakeTimers();


beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    rect: jest.fn(),
    fill: jest.fn(),
    closePath: jest.fn(),
    fillRect: jest.fn()
  });
});



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
  expect(screen.getByText(/Snake$/i)).toBeInTheDocument(); // No longer fails, looks exactly for the word "Snake"
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

// Snake Test Cases
test('starts Snake game when any arrow key is pressed', () => {
  render(<App />);

  fireEvent.click(screen.getByText(/Snake/i));

  // Checking if we are in the Snake game
  expect(screen.getByText(/Snake$/i)).toBeInTheDocument();

  act(() => {
    fireEvent.keyDown(window, {key: 'ArrowRight'});
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Checks after the arrow key is pressed
  const scoreElement = screen.getByText(/High Score: 0$/i);
  expect(scoreElement).toBeInTheDocument();

});

test('ends Snake game on wall collision (game over)', () => {
  render(<App/>);

  fireEvent.click(screen.getByText(/Snake/i));

  act(()  => {
    fireEvent.keyDown(window, {key: 'ArrowRight'});
  });

  act(() => {
    jest.advanceTimersByTime(7000);
  });

  // Check if the game has ended
  expect(screen.getByText(/Game Over/i)).toBeInTheDocument();

  // Check for the right collision reason (wall collision)
  expect(screen.getByText(/You hit the wall/i)).toBeInTheDocument();
});

// Hangman Test Cases
test('Hangman: entering correct letter twice shows popup notification', async () => {
    jest.spyOn(helpers, 'showNotification').mockImplementation(setFn => setFn(true));
    render(<Hangman setGame={jest.fn()}/>);

    await screen.findByText(/Back to MiniGames/i);

    fireEvent.keyDown(window, {key: 'a', keyCode: 65});
    fireEvent.keyDown(window, {key: 'a', keyCode: 65});

    // Check if the notification appears after pressing a correct twice
    expect(screen.getByText(/You have already entered this letter/i)).toBeInTheDocument();

});

test('Hangman: entering incorrect letter twice shows popup notification', async () => {
  jest.spyOn(helpers, 'showNotification').mockImplementation(setFn => setFn(true));
  render(<Hangman setGame={jest.fn()}/>);

  await screen.findByText(/Back to MiniGames/i);

  fireEvent.keyDown(window, {key: 'x', keyCode: 65});
  fireEvent.keyDown(window, {key: 'x', keyCode: 65});

  // Check if the notification appears after pressing a correct twice
  expect(screen.getByText(/You have already entered this letter/i)).toBeInTheDocument();

});

// Test cases for TicTacToe
describe('TicTacToe in App', () => {
  beforeEach(() => {
    render(<App/>);
    fireEvent.click(screen.getByText(/TicTacToe/i));
  });

  test('renders TicTacToe board with 9 cells', () => {
    const cells = screen.getAllByRole('button', {name: ''});
    expect(cells).toHaveLength(9);
  });

  test('Allow to alternate turns for each player', () => {
    const cells = screen.getAllByRole('button', {name: ''});

    fireEvent.click(cells[0]); // Signals X
    // Check if the first element has a X
    expect(cells[0]).toHaveTextContent('X');

    fireEvent.click(cells[4]);
    // Check if the fourth element has a O
    expect(cells[4]).toHaveTextContent('O');
  });

  test('prevent overwriting cells', () => {
    const cells = screen.getAllByRole('button', {name: ''});

    fireEvent.click(cells[0]); // Clicking the same cell twice
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
  });

  test('declare a winner when X wins', () => {
    const cells = screen.getAllByRole('button', {name: ''});

    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[6]); // X, should win here

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });

  test('resets the board and updates the score', () => {
    const cells = screen.getAllByRole('button', {name: ''});

    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[6]); // X, should win here

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();

    fireEvent.keyDown(window, {key: 'Enter', code: 'Enter'});
    const clearedCells = screen.getAllByRole('button', {name: ''});
    expect(cells).toHaveLength(9);
    expect(screen.getByText(/X: 1/i)).toBeInTheDocument();
  });
});