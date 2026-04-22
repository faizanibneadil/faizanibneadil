import * as migration_20260421_164344 from './20260421_164344';
import * as migration_20260422_072419 from './20260422_072419';

export const migrations = [
  {
    up: migration_20260421_164344.up,
    down: migration_20260421_164344.down,
    name: '20260421_164344',
  },
  {
    up: migration_20260422_072419.up,
    down: migration_20260422_072419.down,
    name: '20260422_072419'
  },
];
