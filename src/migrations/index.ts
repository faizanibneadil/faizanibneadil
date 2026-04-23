import * as migration_20260421_164344 from './20260421_164344';
import * as migration_20260422_072419 from './20260422_072419';
import * as migration_20260422_194609 from './20260422_194609';
import * as migration_20260423_142606 from './20260423_142606';
import * as migration_20260423_142915 from './20260423_142915';
import * as migration_20260423_144054 from './20260423_144054';
import * as migration_20260423_144540 from './20260423_144540';

export const migrations = [
  {
    up: migration_20260421_164344.up,
    down: migration_20260421_164344.down,
    name: '20260421_164344',
  },
  {
    up: migration_20260422_072419.up,
    down: migration_20260422_072419.down,
    name: '20260422_072419',
  },
  {
    up: migration_20260422_194609.up,
    down: migration_20260422_194609.down,
    name: '20260422_194609',
  },
  {
    up: migration_20260423_142606.up,
    down: migration_20260423_142606.down,
    name: '20260423_142606',
  },
  {
    up: migration_20260423_142915.up,
    down: migration_20260423_142915.down,
    name: '20260423_142915',
  },
  {
    up: migration_20260423_144054.up,
    down: migration_20260423_144054.down,
    name: '20260423_144054',
  },
  {
    up: migration_20260423_144540.up,
    down: migration_20260423_144540.down,
    name: '20260423_144540'
  },
];
