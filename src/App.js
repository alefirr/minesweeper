import React from 'react';
import { useState } from 'react';
import { Field, SettingsBar } from './components';
import './App.css';
import { MIN_VALUES } from './constants';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [settings, setSettings] = useState(MIN_VALUES);

  const toggleGameStatus = () => setIsGameStarted((prev) => !prev);

  return (
    <div>
      <button onClick={toggleGameStatus}>
        {isGameStarted ? 'End game' : 'Start new game'}
      </button>
      <SettingsBar setSettings={setSettings} settings={settings} />
      {isGameStarted && <Field />}
    </div>
  );
}

export default App;
