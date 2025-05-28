import * as migration_20250528_083051 from './20250528_083051';
import * as migration_20250528_083226 from './20250528_083226';

export const migrations = [
  {
    up: migration_20250528_083051.up,
    down: migration_20250528_083051.down,
    name: '20250528_083051',
  },
  {
    up: migration_20250528_083226.up,
    down: migration_20250528_083226.down,
    name: '20250528_083226'
  },
];
