import React, { useEffect } from 'react';

export const BalanceList = ({
  isGameOver,
  onRestartGame,
  seconds,
  setSeconds,
}) => {
  useEffect(() => {
    !isGameOver && setTimeout(() => setSeconds((prev) => prev + 1), 1000);
  }, [seconds, isGameOver]);

  const secondsToDisplay = seconds % 60;

  return (
    <div className="balance-list-container">
      <h1>
        {Math.floor(seconds / 60)}:{secondsToDisplay < 10 ? '0' : ''}
        {secondsToDisplay}
      </h1>
    </div>
  );
};
