import React from 'react';
import { KEYS, MIN_VALUES } from '../constants';

export const SettingsPage = ({ setSettings, settings, openGame }) => {
  const handleOnChange = (field) => (event) => {
    const newValue = event.target.value;
    setSettings((prev) => ({ ...prev, [field]: newValue }));
  };

  return (
    <div className="settings-bar">
      <p>Height: {settings.height}</p>
      <input
        type="range"
        min={MIN_VALUES.height}
        max="20"
        step="1"
        value={settings.height}
        onChange={handleOnChange(KEYS.HEIGHT)}
      />
      <p>Width: {settings.width}</p>
      <input
        type="range"
        min={MIN_VALUES.width}
        max="20"
        step="1"
        value={settings.width}
        onChange={handleOnChange(KEYS.WIDTH)}
      />
      <p>Mines: {settings.mines}</p>
      <input
        type="range"
        min={MIN_VALUES.mines}
        max="50"
        step="3"
        value={settings.mines}
        onChange={handleOnChange(KEYS.MINES)}
      />
      <button onClick={openGame}>Start new game</button>
    </div>
  );
};
