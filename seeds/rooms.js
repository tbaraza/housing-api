exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('rooms').insert([
        { id: 2000, room_number: 2, house_id: 10000, status: 0 },
        { id: 1000, room_number: 3, house_id: 10000, status: 0 },
        { id: 3000, room_number: 1, house_id: 20000, status: 0 }
      ]);
    });
};
