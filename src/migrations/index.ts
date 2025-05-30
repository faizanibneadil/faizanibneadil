import * as migration_20250528_155259 from './20250528_155259';
import * as migration_20250530_202730 from './20250530_202730';

export const migrations = [
  {
    up: migration_20250528_155259.up,
    down: migration_20250528_155259.down,
    name: '20250528_155259',
  },
  {
    up: migration_20250530_202730.up,
    down: migration_20250530_202730.down,
    name: '20250530_202730'
  },
];
