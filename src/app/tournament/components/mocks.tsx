export const tabs = ['main', 'table', 'brackets', 'testtest', 'testtesttest'];

export const players = Array.from({ length: 4 }, (_, i) => ({
  name: `player${i + 1}`,
  win: 0,
  loose: 0,
  draw: 0,
}));