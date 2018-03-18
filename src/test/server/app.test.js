import request from 'supertest';

import app from './../../server/app';

const staticIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spotify App</title>
  </head>
  <body>
    <div class="app"></div>
  <script type="text/javascript" src="/index_bundle.js"></script></body>
</html>`;

describe('Server - App', () => {
  it('should respond the test GET method', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('should return index.html when GET /', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(staticIndex);
        done();
      });
  });

  it('should return index.html when GET /unknown', (done) => {
    request(app)
      .get('/unknown')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(staticIndex);
        done();
      });
  });
});
