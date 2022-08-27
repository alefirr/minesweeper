import React, { useEffect, useState } from 'react';
import { Cell } from './Cell';

// FIELD VALUE EXAMPLE:
//  [
//    [{isOpen: false, content: 'bomb' }, {isOpen: false, content: 1 }],
//    [{isOpen: trut, content: 8 }, {isOpen: false, content: 1 }],
//    [{isOpen: false, content: 'bomb'}, {isOpen: false, content: 1 }],
//  ]

const generateField = (settings) =>
  Array(settings.width).fill(Array(settings.height).fill({ isOpen: false, content: 0 }));

const openField = (field) => {
  return field.map((row) => row.map((cell) => ({ ...cell, isOpen: true })));
}

export const Field = ({ isGameOver, settings }) => {
  const [field, setField] = useState();

  useEffect(() => {
    if (isGameOver) {
      setField(openField);
    } else {
      const newField = generateField(settings)
      setField(newField);
    }
  }, [isGameOver, settings]);

  return (
    <div className="field">
      {field?.map((row, indexRow) => (
        <div>
          {row?.map((cell, indexCol) => (
            <Cell
              key={`cell-${indexRow}-${indexCol}`}
              {...cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
