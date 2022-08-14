import React from 'react';
import { Field } from './Field';
import { useState } from 'react';

export const GamePage = ({ settings, openSettings }) => {
  const [isGameOver, setIsGameOver] = useState(false);

  const toggleGameStatus = () => setIsGameOver((prev) => !prev);

  return (
    <div className="game-page">
      <Field settings={settings} isGameOver={isGameOver} />
      <div>
        {isGameOver ? (
          <>
            <button onClick={openSettings}>Change Mode</button>
            <button onClick={toggleGameStatus}>Restart</button>
          </>
        ) : (
          <button onClick={toggleGameStatus}>End Game</button>
        )}
      </div>
    </div>
  );
};
