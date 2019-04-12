const db = require('../data/dbConfig.js');
const Games = require('./gamesModel');

describe('gamesModel', () => {

  afterEach(async () => {
    await db('games').truncate();
  });

  describe('getAll', () => {

    it('should return the list of games', async () => {
      const games = await Games.getAll();
      expect(games).toHaveLength(0);
    })
  });

  describe('insert', () => {
    it('should insert the given game into the db', async () => {
      const newGame = { title: 'Watch Dogs 2', genre: 'Adventure', releaseYear: 2016 }
      const game = await Games.insert(newGame);
      const row = await db('games');
      expect(game.title).toBe('Watch Dogs 2');
      expect(row).toHaveLength(1);
    });
    it('should insert the given games into the db', async () => {
      await Games.insert({ title: 'Assassin\'s Creed: Origins', genre: 'Adventure', releaseYear: 2017 });
      await Games.insert({ title: 'The Sims 4', genre: 'Simulation', releaseYear: 2014 });
      await Games.insert({ title: 'The Elder Scrolls V: Skyrim', genre: 'RPG', releaseYear: 2011 });
      await Games.insert({ title: 'GTA V', genre: 'Action-adventure', releaseYear: 2013 });
      await Games.insert({ title: 'BioShock', genre: 'First-person shooter', releaseYear: 2007 });

      const gamesList = await db('games');

      expect(gamesList).toHaveLength(5)
    })
  });

  describe('remove', () => {
    it('should delete a given game by its ID', async () => {
      const newGame = Games.insert({ title: 'Assassin\'s Creed: Origins', genre: 'Adventure', releaseYear: 2017 });
      const newGame2 = Games.insert({ title: 'The Sims 4', genre: 'Simulation', releaseYear: 2014 });
      const result = await Games.remove(1);
      const row = await db('games');
      expect(row).toHaveLength(1);
    });
    it('should return 0 if given game ID could not be found', async () => {
      const expected = 0;
      const actual = await Games.remove(11);
      expect(actual).toEqual(expected);
    });
  });
  describe('getById', () => {
    it('should get a given game by its ID', async () => {
      const newGame = Games.insert({ title: 'Assassin\'s Creed: Origins', genre: 'Adventure', releaseYear: 2017 });
      const result = await Games.getById(1);
      // const row = await db('games');
      expect(result.title).toEqual('Assassin\'s Creed: Origins');
      expect(result.id).toEqual(1);
    });
  });
});
