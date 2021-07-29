


///////////////////////////
exports.seed = function(knex) {
  // Deletes ALL existing entries    
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'Raya', password: 'password', email: 'raya12@gmail.com'},
        {id: 2, username: 'Sisu', password: 'password', email: 'sisu34@gmail.com'},
        {id: 3, username: 'Luca', password: 'password', email: 'luca56@gmail.com'},
        {id: 4, username: 'Alberto', password: 'password', email: 'alberto78@gmail.com'}
        
      ]);
    });
};