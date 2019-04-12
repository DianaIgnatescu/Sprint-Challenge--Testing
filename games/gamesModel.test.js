const db = require('../data/dbConfig.js');
const Games = require('./gamesModel');

let gameList = [
  {
    title: 'Assassin\'s Creed: Origins',
    genre: 'Adventure',
    releaseYear: 2017
  },
  {
    title: 'The Sims 4',
    genre: 'Simulation',
    releaseYear: 2014
  },
  {
    title: 'The Elder Scrolls V: Skyrim',
    genre: 'RPG',
    releaseYear: 2011
  }
];

describe('gamesModel', () => {
  beforeEach(async () => {
    await db('games').truncate().then(() => {

      Games.insert(gameList);
    });
  });

  describe('getAll', () => {

    it('should return the list of games', async () => {
      const games = await Games.getAll();
      expect(games).toHaveLength(3);
    })
  });

  describe('insert', () => {
    it('should insert the given game into the db', async () => {
      const newGame = { title: 'Watch Dogs 2', genre: 'Adventure', releaseYear: 2016 }
      const game = await Games.insert(newGame);
      const row = await db('games');
      expect(game.title).toBe('Watch Dogs 2');
      expect(row).toHaveLength(4);
    });
    it('should insert the given games into the db', async () => {
      await Games.insert({ title: 'GTA V', genre: 'Action-adventure', releaseYear: 2013 });
      await Games.insert({ title: 'BioShock', genre: 'First-person shooter', releaseYear: 2007 });

      const gamesList = await db('games');

      expect(gamesList).toHaveLength(5)
      console.log(gamesList);
    })
  });
});
