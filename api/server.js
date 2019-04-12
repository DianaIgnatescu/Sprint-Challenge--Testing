const express = require('express');

const Games = require('../games/gamesModel.js');
const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get('/games', async (req, res) => {
  const rows = await Games.getAll();

  res.status(200).json(rows);
});

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre || !releaseYear) {
    res.status(422).json({ errorMessage: 'Please provide required details.' });
  } else {
    db('games').insert({ title, genre, releaseYear })
      .then(arrayOfIds => {
        return db('games').where({ id: arrayOfIds[0] })
      })
      .then(arrayOfGames => {
        res.status(201).json({ ...arrayOfGames[0] });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'The game could not be added.' });
      });
  }
});

module.exports = server;
