import PocketBase from 'pocketbase'
import { config } from './config.js'
import { setupCollections } from './collections/index.js'
import { seedData } from './seeds/index.js'

async function main() {
  console.log('🌱 Starting database seeding process...')
  
  const pb = new PocketBase(config.pocketbaseUrl)
  
  try {
    await pb.admins.authWithPassword(config.adminEmail, config.adminPassword)
    console.log('✅ Connected to Pocketbase as admin')
    
    await setupCollections(pb)
    console.log('✅ Collections setup completed')
    
    await seedData(pb)
    console.log('✅ Data seeding completed')
    
    console.log('🎉 Database seeding process completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding process:', error)
    process.exit(1)
  }
}

main()