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

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  Games.remove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The ID ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The game could not be removed.' });
    });
});

module.exports = server;
