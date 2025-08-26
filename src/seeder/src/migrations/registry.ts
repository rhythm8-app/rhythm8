import { Migration } from './index.js'
import { initialCollectionsMigration } from './001_initial_collections.js'

export const migrations: Migration[] = [
  initialCollectionsMigration
]