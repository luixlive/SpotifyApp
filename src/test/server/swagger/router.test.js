import request from 'supertest';

import app from './../../../server/app';
import getRouter from './../../../server/swagger/router';

describe('Server Swagger - Router', () => {
  it('calls swaggerDefault controller', () => {
    const controller = { swaggerDefault: jest.fn(), swaggerJSDoc: jest.fn() };
    const router = getRouter(controller);
    const requestRouter = { url: '/', method: 'GET' };
    router.handle(requestRouter);
    expect(controller.swaggerDefault).toHaveBeenCalledTimes(1);
  });

  it('should return Swagger JSON when GET /swagger/api-docs.json', (done) => {
    request(app)
      .get('/swagger/api-docs.json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatchSnapshot();
        done();
      });
  });

  it('should return Swagger UI when GET /swagger/api-docs', (done) => {
    request(app)
      .get('/swagger/api-docs')
      .then((response) => {
        expect(response.text).toMatchSnapshot();
        done();
      });
  });
});
