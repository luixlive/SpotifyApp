const request = require('supertest');

const app = require('./../../server/app');

const staticIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spotify App</title>
  </head>
  <body>
    <div class="app"></div>
  <script type="text/javascript" src="index_bundle.js"></script></body>
</html>`;

describe('Test server', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('It should return index.html when GET /', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(staticIndex);
        done();
      });
  });

  test('It should return index.html when GET /unknown', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(staticIndex);
        done();
      });
  });

  describe('Test endpoints', () => {
  });
});
