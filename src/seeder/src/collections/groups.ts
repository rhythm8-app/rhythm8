import PocketBase from 'pocketbase'

export async function createGroupsCollection(pb: PocketBase) {
  const collectionName = 'groups'
  
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
          name: 'name',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 100
          }
        },
        {
          name: 'description',
          type: 'editor',
          required: false
        },
        {
          name: 'dance_style',
          type: 'text',
          required: false
        },
        {
          name: 'leader',
          type: 'relation',
          required: true,
          options: {
            collectionId: 'users',
            cascadeDelete: false,
            minSelect: 1,
            maxSelect: 1,
            displayFields: ['name']
          }
        },
        {
          name: 'members',
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
          name: 'active',
          type: 'bool',
          required: false
        }
      ]
    })
  }
}