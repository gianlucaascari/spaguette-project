import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'ingredients',
      columns: [
        { name: 'remote_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'unity_of_measure', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'ingredient_quantities',
      columns: [
        { name: 'recipe_id', type: 'string', isIndexed: true },
        { name: 'ingredient_id', type: 'string', isIndexed: true },
        { name: 'quantity', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'recipes',
      columns: [
        { name: 'remote_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'steps_link', type: 'string', isOptional: true },
      ],
    })
  ]
})