import React from 'react';
import { SETTINGS_ORDER } from '../constants';

export const SettingsPage = ({ setSettings, settings, openGame }) => {
  const handleOnChange = (field) => (event) => {
    const newValue = event.target.value;
    setSettings((prev) => ({ ...prev, [field]: newValue }));
  };

  return (
    <div className="settings-bar">
      {SETTINGS_ORDER.map((field) => (
        <div key={`setting-${field.key}`}>
          <p>
            {field.name}: {settings.height}
          </p>
          <input
            type="range"
            step="1"
            min={field.minValue}
            max={field.maxValue}
            value={settings.height}
            onChange={handleOnChange(field.key)}
          />
        </div>
      ))}
      <button onClick={openGame}>Start new game</button>
    </div>
  );
};
