import React from 'react';
import { CELL_SIZE } from '../constants';

const CELL_DIMENSIONS = {
  width: CELL_SIZE,
  height: CELL_SIZE,
};

export const Cell = () => {
  return <div style={CELL_DIMENSIONS} />;
};
