import PocketBase from 'pocketbase'

export async function createTrainingCollection(pb: PocketBase) {
  const collectionName = 'training_sessions'
  
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
          name: 'date',
          type: 'date',
          required: true
        },
        {
          name: 'duration_minutes',
          type: 'number',
          required: false
        },
        {
          name: 'location',
          type: 'text',
          required: false
        },
        {
          name: 'dance_style',
          type: 'text',
          required: false
        },
        {
          name: 'instructor',
          type: 'relation',
          required: false,
          options: {
            collectionId: 'users',
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: ['name']
          }
        },
        {
          name: 'participants',
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
          name: 'notes',
          type: 'editor',
          required: false
        },
        {
          name: 'rating',
          type: 'number',
          required: false,
          options: {
            min: 1,
            max: 5
          }
        }
      ]
    })
  }
}