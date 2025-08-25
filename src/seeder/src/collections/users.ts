import PocketBase from 'pocketbase'

export async function createUsersCollection(pb: PocketBase) {
  const collectionName = 'users'
  
  try {
    await pb.collections.getOne(collectionName)
    console.log(`📋 Collection '${collectionName}' already exists`)
  } catch (error) {
    console.log(`📋 Creating collection '${collectionName}'...`)
    
    await pb.collections.create({
      name: collectionName,
      type: 'auth',
      schema: [
        {
          name: 'name',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 100
          }
        },
        {
          name: 'avatar',
          type: 'file',
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 5242880,
            mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml']
          }
        },
        {
          name: 'dance_styles',
          type: 'json',
          required: false
        },
        {
          name: 'phone',
          type: 'text',
          required: false
        }
      ]
    })
  }
}