import request from 'supertest';

import app from './../../server/app';
import httpStatus from './../../utils/http_status';

describe('Server - App', () => {
  it('should respond the test GET method', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        done();
      });
  });

  it('should return index.html when GET /', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.text).toMatchSnapshot();
        done();
      });
  });

  it('should return index.html when GET /unknown', (done) => {
    request(app)
      .get('/unknown')
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.text).toMatchSnapshot();
        done();
      });
  });
});
