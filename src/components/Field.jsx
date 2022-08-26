import React, { useEffect, useState } from 'react';
import { Cell } from './Cell';

const getCellsFieldWithStatus = (settings, isCellsOpen) =>
  Array(settings.height).fill(Array(settings.width).fill(isCellsOpen));

const getCellsContent = ({ width, height, mines }) => {
  return [];
};

export const Field = ({ isGameOver, settings }) => {
  const [cellsStatus, setCellsStatus] = useState();
  const [cellsContent, setCellsContent] = useState();

  useEffect(() => {
    if (isGameOver) {
      setCellsStatus(getCellsFieldWithStatus(settings, true));
    } else {
      setCellsStatus(getCellsFieldWithStatus(settings, false));
      setCellsContent(getCellsContent(settings));
    }
  }, [isGameOver, settings]);

  return (
    <div>
      <Cell isOpen={false} content={1} />
      <Cell isOpen={true} content={1} />
      <Cell isOpen={true} content={0} />
      <Cell isOpen={true} content={'mine'} />
    </div>
  );
};
