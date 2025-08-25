import PocketBase from 'pocketbase'

export async function createTravelCollection(pb: PocketBase) {
  const collectionName = 'travel_plans'
  
  try {
    await pb.collections.getOne(collectionName)
    console.log(`📋 Collection '${collectionName}' already exists`)
  } catch (error) {
    console.log(`📋 Creating collection '${collectionName}'...`)
    
    await pb.collections.create({
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
          name: 'destination',
          type: 'text',
          required: true
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
          name: 'event',
          type: 'relation',
          required: false,
          options: {
            collectionId: 'events',
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: ['title']
          }
        },
        {
          name: 'travelers',
          type: 'relation',
          required: false,
          options: {
            collectionId: 'users',
            cascadeDelete: false,
            minSelect: null,
            maxSelect: null,
            displayFields: ['name']
          }
        },
        {
          name: 'estimated_cost',
          type: 'number',
          required: false
        },
        {
          name: 'accommodation',
          type: 'text',
          required: false
        },
        {
          name: 'transportation',
          type: 'text',
          required: false
        },
        {
          name: 'notes',
          type: 'editor',
          required: false
        }
      ]
    })
  }
}