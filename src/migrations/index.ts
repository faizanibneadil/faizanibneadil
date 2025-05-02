import * as migration_20250501_115154 from './20250501_115154';
import * as migration_20250501_202256 from './20250501_202256';
import * as migration_20250501_211808 from './20250501_211808';
import * as migration_20250502_144847 from './20250502_144847';

export const migrations = [
  {
    up: migration_20250501_115154.up,
    down: migration_20250501_115154.down,
    name: '20250501_115154',
  },
  {
    up: migration_20250501_202256.up,
    down: migration_20250501_202256.down,
    name: '20250501_202256',
  },
  {
    up: migration_20250501_211808.up,
    down: migration_20250501_211808.down,
    name: '20250501_211808',
  },
  {
    up: migration_20250502_144847.up,
    down: migration_20250502_144847.down,
    name: '20250502_144847'
  },
];
