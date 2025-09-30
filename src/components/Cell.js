import React from 'react';
import './Cell.css';

const Cell = ({ cell, onClick, onRightClick, gameStatus }) => {
  const getCellContent = () => {
    if (cell.isFlagged) {
      return '🚩';
    }
    
    if (!cell.isRevealed) {
      return '';
    }
    
    if (cell.isMine) {
      return '💣';
    }
    
    if (cell.neighborCount > 0) {
      return cell.neighborCount;
    }
    
    return '';
  };

  const getCellClass = () => {
    let cellClass = 'cell';
    
    if (cell.isRevealed) {
      cellClass += ' revealed';
      if (cell.isMine) {
        cellClass += ' mine';
      } else if (cell.neighborCount > 0) {
        cellClass += ` number-${cell.neighborCount}`;
      }
    } else {
      cellClass += ' hidden';
    }
    
    if (cell.isFlagged) {
      cellClass += ' flagged';
    }
    
    return cellClass;
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={onRightClick}
      onMouseDown={(e) => e.preventDefault()} // Prevent text selection
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;