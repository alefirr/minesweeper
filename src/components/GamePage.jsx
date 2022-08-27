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
            <button
              onClick={openSettings}
              className="change-mode-button navigation-button"
            >
              Change Mode
            </button>
            <button
              onClick={toggleGameStatus}
              className="restart-button navigation-button"
            >
              Restart
            </button>
          </>
        ) : (
          <div className="end-game-button-container">
            <button
              onClick={toggleGameStatus}
              className="end-game-button navigation-button"
            >
              End Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
