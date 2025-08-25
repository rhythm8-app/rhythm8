import PocketBase from 'pocketbase'
import { createUsersCollection } from './users.js'
import { createEventsCollection } from './events.js'
import { createGroupsCollection } from './groups.js'
import { createTrainingCollection } from './training.js'
import { createTravelCollection } from './travel.js'

export async function setupCollections(pb: PocketBase) {
  console.log('🔧 Setting up database collections...')
  
  await createUsersCollection(pb)
  await createEventsCollection(pb)
  await createGroupsCollection(pb)
  await createTrainingCollection(pb)
  await createTravelCollection(pb)
}