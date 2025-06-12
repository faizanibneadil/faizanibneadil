import * as migration_20250606_150952 from './20250606_150952';
import * as migration_20250609_103143 from './20250609_103143';
import * as migration_20250609_115916 from './20250609_115916';
import * as migration_20250609_121903 from './20250609_121903';
import * as migration_20250610_165845 from './20250610_165845';
import * as migration_20250612_101008 from './20250612_101008';

export const migrations = [
  {
    up: migration_20250606_150952.up,
    down: migration_20250606_150952.down,
    name: '20250606_150952',
  },
  {
    up: migration_20250609_103143.up,
    down: migration_20250609_103143.down,
    name: '20250609_103143',
  },
  {
    up: migration_20250609_115916.up,
    down: migration_20250609_115916.down,
    name: '20250609_115916',
  },
  {
    up: migration_20250609_121903.up,
    down: migration_20250609_121903.down,
    name: '20250609_121903',
  },
  {
    up: migration_20250610_165845.up,
    down: migration_20250610_165845.down,
    name: '20250610_165845',
  },
  {
    up: migration_20250612_101008.up,
    down: migration_20250612_101008.down,
    name: '20250612_101008'
  },
];
