import React from 'react';
import { useEffect, useState } from 'react';
import { getMaxMinesValue, SETTINGS_ORDER } from '../constants';
import { CustomPage } from './CustomPage';

export const SettingsPage = ({ setSettings, settings, openGame }) => {
  const [isCustomPageOpen, setIsCustomPageOpen] = useState(false);

  const toggleIsCustomPageOpen = () => setIsCustomPageOpen((prev) => !prev);

  const handleOnChange = (field) => (event) => {
    const newValue = +event.target.value;
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
    <div>
      {isCustomPageOpen && <CustomPage />}
      <div className="settings-page main-container">
        {' '}
        <button
          className="change-theme-button"
          onClick={toggleIsCustomPageOpen}
        >
          <span class="material-symbols-outlined">palette</span>
        </button>
        {SETTINGS_ORDER.map((field) => {
          return (
            <div key={`setting-${field.key}`} className="settings-tile">
              <p className="settings-parametr">
                {field.name}: {settings[field.key]}
              </p>
              <input
                className="settings-input"
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
        <button
          onClick={openGame}
          className="start-new-game-button navigation-button"
        >
          Start new game
        </button>
      </div>
    </div>
  );
};
