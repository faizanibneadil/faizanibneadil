import * as migration_20250816_234922 from './20250816_234922';
import * as migration_20250817_170021 from './20250817_170021';

export const migrations = [
  {
    up: migration_20250816_234922.up,
    down: migration_20250816_234922.down,
    name: '20250816_234922',
  },
  {
    up: migration_20250817_170021.up,
    down: migration_20250817_170021.down,
    name: '20250817_170021'
  },
];
