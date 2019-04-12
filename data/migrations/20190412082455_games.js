
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl) {
    tbl.increments();
    tbl
        .string('title', 255)
        .notNullable()
        .unique();
    tbl
        .string('genre', 255)
        .notNullable();
    tbl
        .string('releaseYear', 255)
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
