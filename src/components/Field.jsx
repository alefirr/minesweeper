import React, { useEffect, useState } from 'react';
import { Cell } from './Cell';
import produce from 'immer';

// FIELD VALUE EXAMPLE:
//  [
//    [{isOpen: false, content: 'mine' }, {isOpen: false, content: 1 }],
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

export const Field = ({ isGameOver, settings, endGame }) => {
  const [field, setField] = useState();

  const openCell = (row, col) => {
    if (field[row][col].content === 'mine') {
      endGame();
    } else {
      setField(
        produce((field) => {
          field[row][col].isOpen = true;
        })
      );
    }
  };

  useEffect(() => {
    if (isGameOver) {
      setField(openField);
    } else {
      const newField = generateField(settings);
      setField(newField);
    }
  }, [isGameOver, settings]);

  return (
    <div className="field">
      {field?.map((row, indexRow) => (
        <div key={`row-${indexRow}-`} className="field-rows">
          {row?.map((cell, indexCol) => (
            <Cell
              key={`cell-${indexCol}`}
              openCell={() => openCell(indexRow, indexCol)}
              {...cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
