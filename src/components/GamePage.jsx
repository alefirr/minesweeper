import React from 'react';
import { Field } from './Field';
import { BalanceList } from './BalanceList';
import { useState } from 'react';

export const GamePage = ({ settings, openSettings }) => {
  const [isGameOver, setIsGameOver] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [flagsNumber, setFlagsNumber] = useState(settings.mines);

  const toggleGameStatus = () => setIsGameOver((prev) => !prev);

  const onRestartGame = () => {
    toggleGameStatus();
    setFlagsNumber(settings.mines);
    setSeconds(0);
  };

  return (
    <div className="game-page-container">
      <BalanceList
        isGameOver={isGameOver}
        seconds={seconds}
        setSeconds={setSeconds}
        flagsNumber={flagsNumber}
      />
      <Field
        settings={settings}
        isGameOver={isGameOver}
        endGame={toggleGameStatus}
        flagsNumber={flagsNumber}
        setFlagsNumber={setFlagsNumber}
      />
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
              onClick={onRestartGame}
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
