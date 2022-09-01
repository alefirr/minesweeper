import React from 'react';
import { CELL_SIZE, CELL_MARGIN } from '../constants';

const CELL_DIMENSIONS = {
  width: CELL_SIZE,
  height: CELL_SIZE,
  margin: CELL_MARGIN,
};

const renderContent = (content, isGameWin) => {
  switch (content) {
    case 0:
      return null;
    case 'mine':
      return isGameWin ? 'C' : 'B';
    default:
      return content;
  }
};

export const Cell = ({
  isOpen,
  content,
  openCell,
  flagCell,
  isFlagged,
  isGameWin,
}) => {
  const onRightClick = (e) => {
    e.preventDefault();
    flagCell();
  };

  return isOpen ? (
    <div style={CELL_DIMENSIONS} className="cell-open cell">
      {renderContent(content, isGameWin)}
    </div>
  ) : (
    <div
      style={CELL_DIMENSIONS}
      className="cell-closed cell"
      onClick={openCell}
      onContextMenu={onRightClick}
    >
      {isFlagged ? 'F' : null}
    </div>
  );
};
