import React, { useCallback, useEffect, useState } from 'react';
import { Cell } from './Cell';
import produce from 'immer';

// FIELD VALUE EXAMPLE:
//  [
//    [{isOpen: false, content: 'mine', isFlagged: true }, {isOpen: false, content: 1 }],
//    [{isOpen: trut, content: 8 }, {isOpen: false, content: 1 }],
//    [{isOpen: false, content: 'mine'}, {isOpen: false, content: 1 }],
//  ]
const getRandomArrayItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const countMinesAround = (field, row, col) => {
  let bombsAround = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < field.length && j >= 0 && j < field[i].length) {
        if (field[i][j] === 'mine') {
          bombsAround++;
        }
      }
    }
  }
  return bombsAround;
};

const generateField = ({ width, height, mines }) => {
  const cellsNumber = width * height;
  const cellsValuesArray = Array(cellsNumber).fill(0);
  const cellsIndexesArray = [...cellsValuesArray.keys()];

  for (let i = 0; i < mines; i++) {
    const randomIndex = getRandomArrayItem(cellsIndexesArray);

    cellsIndexesArray.splice(randomIndex, 1);

    cellsValuesArray[randomIndex] = 'mine';
  }

  const field = [];
  for (let i = 0; i < height; i++) {
    field.push(cellsValuesArray.slice(i * width, (i + 1) * width));
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (field[row][col] !== 'mine') {
        const bombsAround = countMinesAround(field, row, col);
        field[row][col] = bombsAround;
      }
    }
  }

  return field.map((row) =>
    row.map((cell) => ({ isOpen: false, content: cell }))
  );
};

const openField = (field) => {
  return field.map((row) => row.map((cell) => ({ ...cell, isOpen: true })));
};

export const Field = ({
  isGameOver,
  settings,
  endGame,
  flagsNumber,
  setFlagsNumber,
}) => {
  const [field, setField] = useState();
  const [isGameWin, setIsGameWin] = useState(false);

  const countOpenCells = useCallback(() => {
    let openCells = 0;
    field.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isOpen) openCells++;
      })
    );
    return openCells;
  }, [field]);

  const pushCellsToOpen = (row, col, cellsToOpen) => {
    if (field[row][col].content === 0) {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < field.length && j >= 0 && j < field[i].length) {
            if (!cellsToOpen.some(([ii, jj]) => ii === i && jj === j)) {
              cellsToOpen.push([i, j]);
              pushCellsToOpen(i, j, cellsToOpen);
            }
          }
        }
      }
    }
  };

  const openCell = (row, col) => {
    if (field[row][col].content === 'mine' && !field[row][col].isOpen) {
      endGame();
    } else {
      setField(
        produce((field) => {
          field[row][col].isOpen = true;
        })
      );

      const cellsToOpen = [];

      pushCellsToOpen(row, col, cellsToOpen);

      setField(
        produce((field) => {
          cellsToOpen.forEach(([i, j]) => {
            field[i][j].isOpen = true;
          });
        })
      );
    }
  };

  const flagCell = (row, col) => {
    const isFlagged = field[row][col].isFlagged;

    if (isFlagged) {
      setField(
        produce((field) => {
          field[row][col].isFlagged = false;
        })
      );
      setFlagsNumber((prev) => prev + 1);
    } else if (flagsNumber > 0) {
      setField(
        produce((field) => {
          field[row][col].isFlagged = true;
        })
      );
      setFlagsNumber((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (
      field &&
      !isGameOver &&
      countOpenCells() === settings.width * settings.height - settings.mines
    ) {
      setIsGameWin(true);
      endGame();
    }
  }, [countOpenCells, endGame, field, isGameOver, settings]);

  useEffect(() => {
    if (isGameOver) {
      setField(openField);
    } else {
      const newField = generateField(settings);
      setField(newField);
      setIsGameWin(false);
    }
  }, [isGameOver, settings]);

  return (
    <div className="container">
      {' '}
      <div className="field">
        {field?.map((row, indexRow) => (
          <div key={`row-${indexRow}-`} className="field-rows">
            {row?.map((cell, indexCol) => (
              <Cell
                key={`cell-${indexCol}`}
                openCell={() => openCell(indexRow, indexCol)}
                flagCell={() => flagCell(indexRow, indexCol)}
                isGameWin={isGameWin}
                {...cell}
              />
            ))}
          </div>
        ))}
      </div>
      {/* {isGameWin && <div className="win-message">You win!</div>} */}
    </div>
  );
};
