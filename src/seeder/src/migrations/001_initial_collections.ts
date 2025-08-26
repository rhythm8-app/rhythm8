import PocketBase from 'pocketbase'
import { Migration } from './index.js'
import { createUsersCollection } from '../collections/users.js'
import { createEventsCollection } from '../collections/events.js'
import { createGroupsCollection } from '../collections/groups.js'
import { createTrainingCollection } from '../collections/training.js'
import { createTravelCollection } from '../collections/travel.js'

export const initialCollectionsMigration: Migration = {
  version: '001',
  name: 'Create initial collections',
  up: async (pb: PocketBase) => {
    console.log('Creating initial collections...')
    await createUsersCollection(pb)
    await createEventsCollection(pb)
    await createGroupsCollection(pb)
    await createTrainingCollection(pb)
    await createTravelCollection(pb)
  },
  down: async (pb: PocketBase) => {
    console.log('Dropping collections...')
    const collections = ['travel', 'training', 'groups', 'events', 'users']
    for (const collectionName of collections) {
      try {
        const collection = await pb.collections.getOne(collectionName)
        await pb.collections.delete(collection.id)
        console.log(`Dropped collection: ${collectionName}`)
      } catch (error) {
        console.log(`Collection ${collectionName} not found, skipping`)
      }
    }
  }
}