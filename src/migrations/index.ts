import * as migration_20250802_121110 from './20250802_121110';
import * as migration_20250802_132148 from './20250802_132148';
import * as migration_20250802_163904 from './20250802_163904';
import * as migration_20250802_182209 from './20250802_182209';
import * as migration_20250802_204814 from './20250802_204814';
import * as migration_20250803_105851 from './20250803_105851';
import * as migration_20250809_071518 from './20250809_071518';

export const migrations = [
  {
    up: migration_20250802_121110.up,
    down: migration_20250802_121110.down,
    name: '20250802_121110',
  },
  {
    up: migration_20250802_132148.up,
    down: migration_20250802_132148.down,
    name: '20250802_132148',
  },
  {
    up: migration_20250802_163904.up,
    down: migration_20250802_163904.down,
    name: '20250802_163904',
  },
  {
    up: migration_20250802_182209.up,
    down: migration_20250802_182209.down,
    name: '20250802_182209',
  },
  {
    up: migration_20250802_204814.up,
    down: migration_20250802_204814.down,
    name: '20250802_204814',
  },
  {
    up: migration_20250803_105851.up,
    down: migration_20250803_105851.down,
    name: '20250803_105851',
  },
  {
    up: migration_20250809_071518.up,
    down: migration_20250809_071518.down,
    name: '20250809_071518'
  },
];
