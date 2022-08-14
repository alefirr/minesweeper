export const SETTINGS_ORDER = [
  {
    key: 'height',
    name: 'Height',
    minValue: 5,
    maxValue: 20,
  },
  {
    key: 'width',
    name: 'Width',
    minValue: 5,
    maxValue: 20,
  },
  {
    key: 'mines',
    name: 'Mines',
    minValue: 5,
    maxValue: 50,
  },
];

export const MIN_VALUES = SETTINGS_ORDER.reduce((acc, item) => {
  return { ...acc, [item.key]: item.minValue };
}, {});
