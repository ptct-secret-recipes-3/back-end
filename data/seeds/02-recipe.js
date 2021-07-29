
////////////////////
exports.seed = function(knex) {
  // Deletes ALL existing entries    
  return knex('recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe').insert([
        {id: 1, title: 'Kumandra Stew', source: 'Raya', ingredients: "water, ginger, noodles, tumeric, lemonzest", instructions: ["directly infuse compassion and perspective", "Add 2 cups of water"], category: 'soups'},
        {id: 2, title: 'Lasagna', source: 'Luca', ingredients: "pasta, marinara, mozzarella", instructions: ["hop on your vespa", "ride into town to buy cheese", "boil water"], category: 'pasta'},
        
        
      ]);
    });
};
