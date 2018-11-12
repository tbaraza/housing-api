exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rooms', (table) => {
      table.increments('id').primary();
      table.integer('room_number');
      table
        .integer('house_id')
        .references('houses.id')
        .onDelete('SET NULL');
      table.enu('status', [0, 1, 2]);
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable('rooms')]);
};
