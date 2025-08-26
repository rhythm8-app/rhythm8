#!/usr/bin/env node

import PocketBase from 'pocketbase'
import { config } from './config.js'
import { runMigrations, getCurrentVersion } from './migrations/index.js'
import { migrations } from './migrations/registry.js'

async function showHelp() {
  console.log(`
🔧 Database Migration CLI

Usage:
  npm run migrate                 - Run all pending migrations
  npm run migrate:status          - Show current database version and pending migrations
  npm run migrate:create <name>   - Create a new migration file
  
Options:
  --help                          - Show this help message
`)
}

async function showStatus() {
  const pb = new PocketBase(config.pocketbaseUrl)
  
  try {
    await pb.collection('_superusers').authWithPassword(config.adminEmail, config.adminPassword)
    
    const currentVersion = await getCurrentVersion(pb)
    console.log(`📊 Current database version: ${currentVersion || 'none'}`)
    
    const executedMigrations = await pb.collection('_migrations').getFullList({
      sort: 'version'
    }).catch(() => [])
    
    const executedVersions = new Set(executedMigrations.map(m => m.version))
    const pendingMigrations = migrations.filter(m => !executedVersions.has(m.version))
    
    if (pendingMigrations.length > 0) {
      console.log('\n⏳ Pending migrations:')
      pendingMigrations.forEach(m => {
        console.log(`  - ${m.version}: ${m.name}`)
      })
    } else {
      console.log('\n✅ All migrations are up to date')
    }
    
    if (executedMigrations.length > 0) {
      console.log('\n📋 Executed migrations:')
      executedMigrations.forEach(m => {
        console.log(`  - ${m.version}: ${m.name} (${new Date(m.executed_at).toLocaleDateString()})`)
      })
    }
  } catch (error) {
    console.error('❌ Error connecting to database:', error)
    process.exit(1)
  }
}

async function createMigration(name: string) {
  if (!name) {
    console.error('❌ Migration name is required')
    process.exit(1)
  }
  
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const version = `${timestamp}_001`
  const filename = `${version}_${name.toLowerCase().replace(/\s+/g, '_')}.ts`
  
  const template = `import PocketBase from 'pocketbase'
import { Migration } from './index.js'

export const ${name.toLowerCase().replace(/\s+/g, '')}Migration: Migration = {
  version: '${version}',
  name: '${name}',
  up: async (pb: PocketBase) => {
    // Add your migration logic here
    console.log('Running migration: ${name}')
  },
  down: async (pb: PocketBase) => {
    // Add your rollback logic here (optional)
    console.log('Rolling back migration: ${name}')
  }
}
`
  
  const fs = await import('fs')
  const path = await import('path')
  
  const migrationPath = path.join(process.cwd(), 'src', 'migrations', filename)
  fs.writeFileSync(migrationPath, template)
  
  console.log(`✅ Created migration file: ${filename}`)
  console.log(`📝 Don't forget to add it to src/migrations/registry.ts`)
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  
  if (args.includes('--help') || command === 'help') {
    await showHelp()
    return
  }
  
  switch (command) {
    case 'status':
      await showStatus()
      break
    case 'create':
      await createMigration(args.slice(1).join(' '))
      break
    case undefined:
    case 'run':
      const pb = new PocketBase(config.pocketbaseUrl)
      try {
        await pb.collection('_superusers').authWithPassword(config.adminEmail, config.adminPassword)
        await runMigrations(pb, migrations)
        console.log('✅ All migrations completed')
      } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
      }
      break
    default:
      console.error(`❌ Unknown command: ${command}`)
      await showHelp()
      process.exit(1)
  }
}

main()