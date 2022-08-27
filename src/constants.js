export const CELL_SIZE = 40;
export const CELL_MARGIN = 2;
export const BUTTON_BOX_SIZE = 40;

export const getMaxMinesValue = (settings) =>
  settings.height * settings.width - 1;

export const SETTINGS_ORDER = [
  {
    key: 'height',
    name: 'Height',
    minValue: 5,
    getMaxValue: () =>
      Math.floor(
        (window.innerHeight - BUTTON_BOX_SIZE) / (CELL_SIZE + CELL_MARGIN * 2)
      ),
  },
  {
    key: 'width',
    name: 'Width',
    minValue: 5,
    getMaxValue: () =>
      Math.floor(window.innerWidth / (CELL_SIZE + CELL_MARGIN * 2)),
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
