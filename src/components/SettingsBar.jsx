import React from 'react';
import { KEYS } from '../constants';

export const SettingsBar = ({ setSettings, settings }) => {
  const handleOnChange = (field) => (event) => {
    const newValue = event.target.value;
    setSettings((prev) => ({ ...prev, [field]: newValue }));
  };

  return (
    <div className="settings-bar">
      <p>Height: {settings.height}</p>
      <input
        type="range"
        min="5"
        max="20"
        step="1"
        value={settings.height}
        onChange={handleOnChange(KEYS.HEIGHT)}
      />
      <p>Width: {settings.width}</p>
      <input
        type="range"
        min="5"
        max="20"
        step="1"
        value={settings.width}
        onChange={handleOnChange(KEYS.WIDTH)}
      />
      <p>Mines: {settings.mines}</p>
      <input
        type="range"
        min="3"
        max="50"
        step="3"
        value={settings.mines}
        onChange={handleOnChange(KEYS.MINES)}
      />
    </div>
  );
};
