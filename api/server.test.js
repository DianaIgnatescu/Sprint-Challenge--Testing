const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig.js');

describe('server', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET, /games', () => {
    afterEach(async () => {
      await db('games').truncate();
    });
    it('should return a status code of 200 OK', async () => {
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });
    it('should always return an array, even if there are no games stored in the database', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBeTruthy();
    });
    it('should return the correct number of games stored in the database', async () => {
      const response = await request(server).get('/games');
      expect(response.body.length).toBe(0);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toBe('application/json');
    });
  });

  describe('POST, /games', () => {
    afterEach(async () => {
      await db('games').truncate();
    });
    it('should return status code 422 if the information included inside the body is incorrect', async () => {
      const newGame = { name: 'God of War', genre: 'Action-adventure', releaseYear: 2018 };
      const response = await request(server).post('/games').send(newGame);
      expect(response.status).toBe(422);
    });
    it('should return status code 422 if the information included inside the body is incomplete', async () => {
      const newGame = { title: 'God of War' };
      const response = await request(server).post('/games').send(newGame);
      expect(response.status).toBe(422);
    });
    it('should return status code 201 Created when request successful', async () => {
      const body = { title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 };
      const response = await request(server).post('/games').send(body);

      expect(response.status).toBe(201);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toBe('application/json');
    });
  });

  describe('DELETE, /games/:id', () => {
    afterEach(async () => {
      await db('games').truncate();
    });
    it('should return 200 OK when request successful', async () => {
      const newGame = await request(server).post('/games').send({ title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 });
      const id = 1;
      const response = await request(server).delete(`/games/${id}`).send(toString(id));

      expect(response.status).toBe(200);
    });
    it('should return status code 404 Not Found when a game is not found for the provided id', async () => {
      const id = 3;
      const response = await request(server).delete(`/games/${id}`);

      expect(response.status).toBe(404);
    });
  });
});

