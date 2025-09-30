import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, onCellClick, onRightClick, gameStatus }) => {
  if (!board || board.length === 0) {
    return <div className="board-loading">Loading...</div>;
  }

  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              cell={cell}
              onClick={() => onCellClick(i, j)}
              onRightClick={(e) => onRightClick(e, i, j)}
              gameStatus={gameStatus}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;