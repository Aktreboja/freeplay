const request = require('supertest');
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');

// Mock the fetchData utility
jest.mock('../utils/fetchData', () => jest.fn());

const fetchData = require('../utils/fetchData');

// Sample schema and resolvers for testing
const schema = buildSchema(`
  type Game {
    id: Int
    title: String
    genre: String
  }

  type Query {
    game(id: Int): Game
    games: [Game]
  }
`);

const root = {
  game: ({ id }) => ({ id, title: 'Test Game', genre: 'RPG' }),
  games: () => [{ id: 1, title: 'Test Game 1', genre: 'RPG' }]
};

const app = express();
app.use(bodyParser.json());

app.post('/graphql', createHandler({ schema, rootValue: root }));

describe('GraphQL API', () => {
  it('should fetch a single game by ID', async () => {
    const query = {
      query: `
        query {
          game(id: 1) {
            id
            title
            genre
          }
        }
      `
    };

    const response = await request(app)
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.game).toEqual({
      id: 1,
      title: 'Test Game',
      genre: 'RPG'
    });
  });

  it('should fetch all games', async () => {
    const query = {
      query: `
        query {
          games {
            id
            title
            genre
          }
        }
      `
    };

    const response = await request(app)
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.games).toEqual([
      {
        id: 1,
        title: 'Test Game 1',
        genre: 'RPG'
      }
    ]);
  });
});
