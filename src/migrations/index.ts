import * as migration_20250528_155259 from './20250528_155259';
import * as migration_20250530_202730 from './20250530_202730';
import * as migration_20250531_185712 from './20250531_185712';
import * as migration_20250601_070524 from './20250601_070524';
import * as migration_20250601_075036 from './20250601_075036';
import * as migration_20250601_122030 from './20250601_122030';
import * as migration_20250601_133819 from './20250601_133819';
import * as migration_20250606_111256 from './20250606_111256';

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
    name: '20250601_075036',
  },
  {
    up: migration_20250601_122030.up,
    down: migration_20250601_122030.down,
    name: '20250601_122030',
  },
  {
    up: migration_20250601_133819.up,
    down: migration_20250601_133819.down,
    name: '20250601_133819',
  },
  {
    up: migration_20250606_111256.up,
    down: migration_20250606_111256.down,
    name: '20250606_111256'
  },
];
