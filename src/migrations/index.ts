import * as migration_20260421_150250 from './20260421_150250';

export const migrations = [
  {
    up: migration_20260421_150250.up,
    down: migration_20260421_150250.down,
    name: '20260421_150250'
  },
];
