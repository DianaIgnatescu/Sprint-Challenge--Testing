const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET, /games', () => {
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
      expect(response.body.length).toBe(5);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toBe('application/json');
    });
  });

  describe('POST, /games', () => {
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

});
