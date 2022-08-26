import React from 'react';
import { CELL_SIZE } from '../constants';

const CELL_DIMENSIONS = {
  width: CELL_SIZE,
  height: CELL_SIZE,
};

const renderContent = (content) => {
  switch (content) {
    case 0:
      return null;
    case 'mine':
      return 'B';
    default:
      return content;
  }
};

export const Cell = ({ isOpen, content }) => {
  return isOpen ? (
    <div style={CELL_DIMENSIONS} className="cell-open cell ">
      {renderContent(content)}
    </div>
  ) : (
    <div style={CELL_DIMENSIONS} className="cell-closed cell"></div>
  );
};
