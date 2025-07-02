import * as migration_20250614_220110 from './20250614_220110';
import * as migration_20250628_053657 from './20250628_053657';

export const migrations = [
  {
    up: migration_20250614_220110.up,
    down: migration_20250614_220110.down,
    name: '20250614_220110',
  },
  {
    up: migration_20250628_053657.up,
    down: migration_20250628_053657.down,
    name: '20250628_053657'
  },
];
