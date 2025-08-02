import * as migration_20250802_121110 from './20250802_121110';
import * as migration_20250802_132148 from './20250802_132148';

export const migrations = [
  {
    up: migration_20250802_121110.up,
    down: migration_20250802_121110.down,
    name: '20250802_121110',
  },
  {
    up: migration_20250802_132148.up,
    down: migration_20250802_132148.down,
    name: '20250802_132148'
  },
];
