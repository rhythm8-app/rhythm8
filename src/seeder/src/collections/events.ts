import PocketBase from 'pocketbase'

export async function createEventsCollection(pb: PocketBase) {
  const collectionName = 'events'
  
  try {
    const existingCollection = await pb.collections.getOne(collectionName)
    console.log(`📋 Collection '${collectionName}' already exists`)
    return existingCollection
  } catch (error) {
    console.log(`📋 Creating collection '${collectionName}'...`)
    
    const usersCollection = await pb.collections.getOne('users').catch(() => null)
    
    const collection = await pb.collections.create({
      name: collectionName,
      type: 'base',
      schema: [
        {
          name: 'title',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 200
          }
        },
        {
          name: 'description',
          type: 'editor',
          required: false
        },
        {
          name: 'start_date',
          type: 'date',
          required: true
        },
        {
          name: 'end_date',
          type: 'date',
          required: true
        },
        {
          name: 'location',
          type: 'text',
          required: false
        },
        {
          name: 'event_type',
          type: 'select',
          required: true,
          options: {
            maxSelect: 1,
            values: ['competition', 'workshop', 'social', 'training', 'performance']
          }
        },
        {
          name: 'registration_deadline',
          type: 'date',
          required: false
        },
        {
          name: 'cost',
          type: 'number',
          required: false
        },
        {
          name: 'organizer',
          type: 'relation',
          required: false,
          options: {
            collectionId: usersCollection?.id || '',
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: ['name']
          }
        }
      ]
    })
    
    return collection
  }
}