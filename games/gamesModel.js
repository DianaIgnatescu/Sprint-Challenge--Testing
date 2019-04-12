const db = require('../data/dbConfig');

function getAll() {
  return db('games');
}

function getById(id) {
  return db('games')
    .where({ id })
    .first();
}

async function insert(game) {
  const [id] = await db('games').insert(game);
  return db('games').where({id}).first();
}

function remove(id) {
  return db('games').where({id}).first().delete();
}

module.exports = {
  getById,
  getAll,
  insert,
  remove
};
