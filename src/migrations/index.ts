import * as migration_20250704_213756 from './20250704_213756';
import * as migration_20250704_224256 from './20250704_224256';
import * as migration_20250705_011343 from './20250705_011343';
import * as migration_20250705_102246 from './20250705_102246';
import * as migration_20250705_214633 from './20250705_214633';
import * as migration_20250705_215047 from './20250705_215047';
import * as migration_20250706_115957 from './20250706_115957';

export const migrations = [
  {
    up: migration_20250704_213756.up,
    down: migration_20250704_213756.down,
    name: '20250704_213756',
  },
  {
    up: migration_20250704_224256.up,
    down: migration_20250704_224256.down,
    name: '20250704_224256',
  },
  {
    up: migration_20250705_011343.up,
    down: migration_20250705_011343.down,
    name: '20250705_011343',
  },
  {
    up: migration_20250705_102246.up,
    down: migration_20250705_102246.down,
    name: '20250705_102246',
  },
  {
    up: migration_20250705_214633.up,
    down: migration_20250705_214633.down,
    name: '20250705_214633',
  },
  {
    up: migration_20250705_215047.up,
    down: migration_20250705_215047.down,
    name: '20250705_215047',
  },
  {
    up: migration_20250706_115957.up,
    down: migration_20250706_115957.down,
    name: '20250706_115957'
  },
];
