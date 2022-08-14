export const CELL_SIZE = 40;

export const getMaxMinesValue = (settings) =>
  settings.height * settings.width - 1;

export const SETTINGS_ORDER = [
  {
    key: 'height',
    name: 'Height',
    minValue: 5,
    getMaxValue: () => Math.floor(window.innerHeight / CELL_SIZE),
  },
  {
    key: 'width',
    name: 'Width',
    minValue: 5,
    getMaxValue: () => Math.floor(window.innerWidth / CELL_SIZE),
  },
  {
    key: 'mines',
    name: 'Mines',
    minValue: 5,
    getMaxValue: getMaxMinesValue,
  },
];

export const MIN_VALUES = SETTINGS_ORDER.reduce((acc, item) => {
  return { ...acc, [item.key]: item.minValue };
}, {});
