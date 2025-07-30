import * as migration_20250730_080105 from './20250730_080105';
import * as migration_20250730_115822 from './20250730_115822';

export const migrations = [
  {
    up: migration_20250730_080105.up,
    down: migration_20250730_080105.down,
    name: '20250730_080105',
  },
  {
    up: migration_20250730_115822.up,
    down: migration_20250730_115822.down,
    name: '20250730_115822'
  },
];
