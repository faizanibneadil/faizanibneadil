import * as migration_20250704_213756 from './20250704_213756';
import * as migration_20250704_224256 from './20250704_224256';

export const migrations = [
  {
    up: migration_20250704_213756.up,
    down: migration_20250704_213756.down,
    name: '20250704_213756',
  },
  {
    up: migration_20250704_224256.up,
    down: migration_20250704_224256.down,
    name: '20250704_224256'
  },
];
