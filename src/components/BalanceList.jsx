import React, { useEffect } from 'react';

export const BalanceList = ({
  isGameOver,
  seconds,
  setSeconds,
  flagsNumber,
}) => {
  useEffect(() => {
    !isGameOver && setTimeout(() => setSeconds((prev) => prev + 1), 1000);
  }, [seconds, isGameOver]);

  useEffect(() => {}, []);

  const secondsToDisplay = seconds % 60;

  return (
    <div className="balance-list-container">
      <h1>
        {Math.floor(seconds / 60)}:{secondsToDisplay < 10 ? '0' : ''}
        {secondsToDisplay}
      </h1>
      <div>
        <p>Flags left:{flagsNumber}</p>
      </div>
    </div>
  );
};
