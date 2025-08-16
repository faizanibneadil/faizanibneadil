import * as migration_20250816_100948 from './20250816_100948';

export const migrations = [
  {
    up: migration_20250816_100948.up,
    down: migration_20250816_100948.down,
    name: '20250816_100948'
  },
];
