exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms')
    .del()
    .then(() => {
      return knex('houses').del();
    })
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
    })
    .then(() => {
      // Inserts seed entries
      return knex('rooms').insert([
        { id: 2000, room_number: 2, house_id: 10000, status: 0 },
        { id: 1000, room_number: 3, house_id: 10000, status: 0 },
        { id: 3000, room_number: 1, house_id: 20000, status: 0 },
        { id: 4000, room_number: 5, house_id: 3000, status: 0 }
      ]);
    });
};
