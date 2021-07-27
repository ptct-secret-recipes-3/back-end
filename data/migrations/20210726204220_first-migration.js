
exports.up = function(knex) {
  return knex.schema
    .createTable('user', user => {
        user.increments('id')
        user.string('username', 300)
            .notNullable()
            .unique()
        user.string("password", 300)
            .notNullable()
            .unique()
        user.string("email", 300)
            .unique()
            
    })
    .createTable('recipe', recipe => {
        recipe.increments('recipe_id')
        recipe.string("title", 300)
            .notNullable()
            .unique()
        recipe.string("source", 300)
            .notNullable()
        recipe.string("ingredients")
            .notNullable()
        recipe.string("category")
            
    })
    .createTable('recipe_instructions', recipe_instructions => {
        recipe_instructions.increments('id')
        recipe_instructions.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipe')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
    })
};



exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user')
    .dropTableIfExists('recipe')
    .dropTableIfExists('recipe_instructions')
  
};

