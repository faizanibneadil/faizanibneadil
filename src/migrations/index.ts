import * as migration_20250528_095423 from './20250528_095423';
import * as migration_20250528_102254 from './20250528_102254';

export const migrations = [
  {
    up: migration_20250528_095423.up,
    down: migration_20250528_095423.down,
    name: '20250528_095423',
  },
  {
    up: migration_20250528_102254.up,
    down: migration_20250528_102254.down,
    name: '20250528_102254'
  },
];
