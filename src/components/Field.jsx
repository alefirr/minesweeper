import React from 'react';
import { useEffect } from 'react';

export const Field = ({ isGamePageOpened, settings }) => {
  useEffect(() => {
    if (isGamePageOpened) {
      console.log('game started');
    } else {
      console.log('game ended');
    }
  }, [isGamePageOpened]);

  return <div></div>;
};
