import * as migration_20250606_150952 from './20250606_150952';
import * as migration_20250609_103143 from './20250609_103143';

export const migrations = [
  {
    up: migration_20250606_150952.up,
    down: migration_20250606_150952.down,
    name: '20250606_150952',
  },
  {
    up: migration_20250609_103143.up,
    down: migration_20250609_103143.down,
    name: '20250609_103143'
  },
];
