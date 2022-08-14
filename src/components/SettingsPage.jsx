import React from 'react';
import { useEffect } from 'react';
import { getMaxMinesValue, SETTINGS_ORDER } from '../constants';

export const SettingsPage = ({ setSettings, settings, openGame }) => {
  const handleOnChange = (field) => (event) => {
    const newValue = event.target.value;
    setSettings((prev) => ({ ...prev, [field]: newValue }));
  };

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      mines: Math.min(prev.mines, getMaxMinesValue(settings)),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.height, settings.width]);

  return (
    <div className="settings-bar">
      {SETTINGS_ORDER.map((field) => {
        return (
          <div key={`setting-${field.key}`}>
            <p>
              {field.name}: {settings[field.key]}
            </p>
            <input
              type="range"
              step="1"
              min={field.minValue}
              max={field.getMaxValue(settings)}
              value={settings[field.key]}
              onChange={handleOnChange(field.key)}
            />
          </div>
        );
      })}
      <button onClick={openGame}>Start new game</button>
    </div>
  );
};
