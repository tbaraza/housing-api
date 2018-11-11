exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('houses', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.unique('name');
      table.string('location');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable('houses')]);
};
