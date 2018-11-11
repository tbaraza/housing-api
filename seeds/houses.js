exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('houses')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('houses').insert([
        { id: 10000, name: 'Peniel House', location: 'Kibera, Nairobi' },
        {
          id: 20000,
          name: 'Victory House',
          location: 'Ngumba estate, Nairobi'
        },
        { id: 3000, name: 'Lerna House', location: 'Mariakani, Mombasa' }
      ]);
    });
};
