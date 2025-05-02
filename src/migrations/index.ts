import * as migration_20250501_115154 from './20250501_115154';
import * as migration_20250501_202256 from './20250501_202256';
import * as migration_20250501_211808 from './20250501_211808';
import * as migration_20250502_144847 from './20250502_144847';
import * as migration_20250502_172401 from './20250502_172401';
import * as migration_20250502_172747 from './20250502_172747';
import * as migration_20250502_172930 from './20250502_172930';
import * as migration_20250502_181115 from './20250502_181115';

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
    name: '20250502_144847',
  },
  {
    up: migration_20250502_172401.up,
    down: migration_20250502_172401.down,
    name: '20250502_172401',
  },
  {
    up: migration_20250502_172747.up,
    down: migration_20250502_172747.down,
    name: '20250502_172747',
  },
  {
    up: migration_20250502_172930.up,
    down: migration_20250502_172930.down,
    name: '20250502_172930',
  },
  {
    up: migration_20250502_181115.up,
    down: migration_20250502_181115.down,
    name: '20250502_181115'
  },
];
