const db = require('../data/dbConfig');

function getAll() {
  return db('games');
}

async function insert(game) {
  const [id] = await db('games').insert(game);
  return db('games').where({id}).first();
}

function remove(id) {
  return db('games').where({id}).first().delete();
}

module.exports = {
  getAll,
  insert,
  remove
};
