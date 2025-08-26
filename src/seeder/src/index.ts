import PocketBase from 'pocketbase'
import { config } from './config.js'
import { runMigrations, getCurrentVersion } from './migrations/index.js'
import { migrations } from './migrations/registry.js'
import { seedData } from './seeds/index.js'

async function main() {
  console.log('🌱 Starting database setup process...')
  console.log(' pocketbase url:', config.pocketbaseUrl)
  
  const pb = new PocketBase(config.pocketbaseUrl)
  
  try {
    await pb.collection('_superusers').authWithPassword(config.adminEmail, config.adminPassword)
    console.log('✅ Connected to Pocketbase as admin')
    
    const currentVersion = await getCurrentVersion(pb)
    console.log(`📊 Current database version: ${currentVersion || 'none'}`)
    
    await runMigrations(pb, migrations)
    console.log('✅ Migrations completed')
    
    const args = process.argv.slice(2)
    if (!args.includes('--migrate-only')) {
      await seedData(pb)
      console.log('✅ Data seeding completed')
    }
    
    console.log('🎉 Database setup process completed successfully!')
  } catch (error) {
    console.error('❌ Error during setup process:', error)
    process.exit(1)
  }
}

main()