import * as migration_20250606_150952 from './20250606_150952';

export const migrations = [
  {
    up: migration_20250606_150952.up,
    down: migration_20250606_150952.down,
    name: '20250606_150952'
  },
];
