import * as migration_20250528_155259 from './20250528_155259';
import * as migration_20250530_202730 from './20250530_202730';
import * as migration_20250531_185712 from './20250531_185712';
import * as migration_20250601_070524 from './20250601_070524';
import * as migration_20250601_075036 from './20250601_075036';

export const migrations = [
  {
    up: migration_20250528_155259.up,
    down: migration_20250528_155259.down,
    name: '20250528_155259',
  },
  {
    up: migration_20250530_202730.up,
    down: migration_20250530_202730.down,
    name: '20250530_202730',
  },
  {
    up: migration_20250531_185712.up,
    down: migration_20250531_185712.down,
    name: '20250531_185712',
  },
  {
    up: migration_20250601_070524.up,
    down: migration_20250601_070524.down,
    name: '20250601_070524',
  },
  {
    up: migration_20250601_075036.up,
    down: migration_20250601_075036.down,
    name: '20250601_075036'
  },
];
