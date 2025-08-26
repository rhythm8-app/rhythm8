import PocketBase from 'pocketbase'

export interface Migration {
  version: string
  name: string
  up: (pb: PocketBase) => Promise<void>
  down?: (pb: PocketBase) => Promise<void>
}

export async function runMigrations(pb: PocketBase, migrations: Migration[]) {
  console.log('🔄 Starting database migrations...')
  
  // Create migrations collection if it doesn't exist
  try {
    await pb.collections.getOne('_migrations')
  } catch (error) {
    console.log('📋 Creating migrations tracking collection...')
    await pb.collections.create({
      name: '_migrations',
      type: 'base',
      schema: [
        {
          name: 'version',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 50
          }
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 200
          }
        },
        {
          name: 'executed_at',
          type: 'date',
          required: true
        }
      ]
    })
  }
  
  // Get already executed migrations
  const executedMigrations = await pb.collection('_migrations').getFullList({
    sort: 'version'
  })
  
  const executedVersions = new Set(executedMigrations.map(m => m.version))
  
  // Sort migrations by version
  const sortedMigrations = migrations.sort((a, b) => a.version.localeCompare(b.version))
  
  // Execute pending migrations
  for (const migration of sortedMigrations) {
    if (!executedVersions.has(migration.version)) {
      console.log(`🔄 Running migration ${migration.version}: ${migration.name}`)
      
      try {
        await migration.up(pb)
        
        // Record successful migration
        await pb.collection('_migrations').create({
          version: migration.version,
          name: migration.name,
          executed_at: new Date().toISOString()
        })
        
        console.log(`✅ Migration ${migration.version} completed successfully`)
      } catch (error) {
        console.error(`❌ Migration ${migration.version} failed:`, error)
        throw error
      }
    } else {
      console.log(`⏭️  Migration ${migration.version} already executed`)
    }
  }
  
  console.log('✅ All migrations completed')
}

export async function getCurrentVersion(pb: PocketBase): Promise<string | null> {
  try {
    const latestMigration = await pb.collection('_migrations').getFirstListItem('', {
      sort: '-version'
    })
    return latestMigration.version
  } catch (error) {
    return null
  }
}