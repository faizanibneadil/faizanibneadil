import * as migration_20250501_115154 from './20250501_115154';
import * as migration_20250501_202256 from './20250501_202256';

export const migrations = [
  {
    up: migration_20250501_115154.up,
    down: migration_20250501_115154.down,
    name: '20250501_115154',
  },
  {
    up: migration_20250501_202256.up,
    down: migration_20250501_202256.down,
    name: '20250501_202256'
  },
];
