import React from 'react';
import { useState } from 'react';
import { GamePage, SettingsPage } from './components';
import './App.css';
import { MIN_VALUES } from './constants';
import './bomb.png';

function App() {
  const [isGamePageOpened, setIsGamePageOpened] = useState(false);
  const [settings, setSettings] = useState(MIN_VALUES);

  const toggleGamePage = () => setIsGamePageOpened((prev) => !prev);

  return (
    <div>
      {isGamePageOpened ? (
        <GamePage settings={settings} openSettings={toggleGamePage} />
      ) : (
        <SettingsPage
          setSettings={setSettings}
          settings={settings}
          openGame={toggleGamePage}
        />
      )}
    </div>
  );
}

export default App;
