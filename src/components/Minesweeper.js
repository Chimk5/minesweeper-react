import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import './Minesweeper.css';

const Minesweeper = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [mineCount, setMineCount] = useState(10);
  const [flagCount, setFlagCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Game settings
  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  // Initialize board
  const initializeBoard = useCallback(() => {
    const newBoard = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        row.push({
          x: i,
          y: j,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        });
      }
      newBoard.push(row);
    }
    return newBoard;
  }, [ROWS, COLS]);

  // Place mines randomly on the board
  const placeMines = useCallback((board, firstClickX, firstClickY) => {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const x = Math.floor(Math.random() * ROWS);
      const y = Math.floor(Math.random() * COLS);
      
      // Don't place mine on first click or if already has mine
      if ((x !== firstClickX || y !== firstClickY) && !board[x][y].isMine) {
        board[x][y].isMine = true;
        minesPlaced++;
      }
    }
    return board;
  }, [ROWS, COLS, MINES]);

  // Calculate neighbor mine counts
  const calculateNeighborCounts = useCallback((board) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!board[i][j].isMine) {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && board[ni][nj].isMine) {
                count++;
              }
            }
          }
          board[i][j].neighborCount = count;
        }
      }
    }
    return board;
  }, [ROWS, COLS]);

  // Initialize game
  const initializeGame = useCallback(() => {
    const newBoard = initializeBoard();
    setBoard(newBoard);
    setGameStatus('playing');
    setFlagCount(0);
    setTimeElapsed(0);
    setGameStarted(false);
  }, [initializeBoard]);

  // Start new game
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStarted && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameStatus]);

  // Handle cell click
  const handleCellClick = (x, y) => {
    if (gameStatus !== 'playing' || board[x][y].isRevealed || board[x][y].isFlagged) {
      return;
    }

    let newBoard = [...board];

    // First click - place mines
    if (!gameStarted) {
      newBoard = placeMines(newBoard, x, y);
      newBoard = calculateNeighborCounts(newBoard);
      setGameStarted(true);
    }

    // Reveal cell
    newBoard = revealCell(newBoard, x, y);
    setBoard(newBoard);

    // Check game status
    if (newBoard[x][y].isMine) {
      setGameStatus('lost');
      // Reveal all mines
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true;
          }
        }
      }
      setBoard([...newBoard]);
    } else {
      checkWinCondition(newBoard);
    }
  };

  // Reveal cell and neighbors if no adjacent mines
  const revealCell = (board, x, y) => {
    if (x < 0 || x >= ROWS || y < 0 || y >= COLS || board[x][y].isRevealed || board[x][y].isFlagged) {
      return board;
    }

    board[x][y].isRevealed = true;

    // If no adjacent mines, reveal neighbors
    if (board[x][y].neighborCount === 0 && !board[x][y].isMine) {
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          revealCell(board, x + di, y + dj);
        }
      }
    }

    return board;
  };

  // Handle right click (flag/unflag)
  const handleRightClick = (e, x, y) => {
    e.preventDefault();
    
    if (gameStatus !== 'playing' || board[x][y].isRevealed) {
      return;
    }

    const newBoard = [...board];
    newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
    setBoard(newBoard);
    
    setFlagCount(prev => newBoard[x][y].isFlagged ? prev + 1 : prev - 1);
  };

  // Check win condition
  const checkWinCondition = (board) => {
    let revealedCount = 0;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (board[i][j].isRevealed && !board[i][j].isMine) {
          revealedCount++;
        }
      }
    }

    if (revealedCount === ROWS * COLS - MINES) {
      setGameStatus('won');
    }
  };

  return (
    <div className="minesweeper">
      <div className="game-header">
        <div className="game-info">
          <div className="info-item">
            <span className="label">Mines:</span>
            <span className="value">{MINES - flagCount}</span>
          </div>
          <div className="info-item">
            <span className="label">Time:</span>
            <span className="value">{timeElapsed}</span>
          </div>
        </div>
        
        <button className="new-game-btn" onClick={initializeGame}>
          {gameStatus === 'playing' ? '🙂' : gameStatus === 'won' ? '😎' : '😵'}
        </button>
        
        <div className="game-status">
          {gameStatus === 'won' && <span className="status-text">You Won! 🎉</span>}
          {gameStatus === 'lost' && <span className="status-text">Game Over! 💣</span>}
        </div>
      </div>
      
      <Board 
        board={board}
        onCellClick={handleCellClick}
        onRightClick={handleRightClick}
        gameStatus={gameStatus}
      />
    </div>
  );
};

export default Minesweeper;