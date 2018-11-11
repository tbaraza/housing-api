exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('rooms').insert([
        { id: 2, room_number: 2, house_id: 1, status: 0 },
        { id: 1, room_number: 3, house_id: 1, status: 0 },
        { id: 3, room_number: 1, house_id: 2, status: 0 }
      ]);
    });
};
