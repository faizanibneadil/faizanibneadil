import * as migration_20250614_220110 from './20250614_220110';

export const migrations = [
  {
    up: migration_20250614_220110.up,
    down: migration_20250614_220110.down,
    name: '20250614_220110'
  },
];
