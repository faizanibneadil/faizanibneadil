import * as migration_20250816_234922 from './20250816_234922';
import * as migration_20250817_170021 from './20250817_170021';
import * as migration_20250818_083009 from './20250818_083009';

export const migrations = [
  {
    up: migration_20250816_234922.up,
    down: migration_20250816_234922.down,
    name: '20250816_234922',
  },
  {
    up: migration_20250817_170021.up,
    down: migration_20250817_170021.down,
    name: '20250817_170021',
  },
  {
    up: migration_20250818_083009.up,
    down: migration_20250818_083009.down,
    name: '20250818_083009'
  },
];
