import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'plan',
          columns: [
            { name: 'num_times', type: 'number' },
            { name: 'recipe_id', type: 'string' },
          ],
        }),
        createTable({
          name: 'list',
          columns: [
            { name: 'ingredient_id', type: 'string' },
            { name: 'quantity', type: 'number' },
            { name: 'taken', type: 'boolean' },
          ],
        }),
      ],
    }
  ],
})