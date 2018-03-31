import Joi from 'joi';

import httpStatus from './../../../utils/http_status';
import { validateSchema } from './../../../server/middlewares';

describe('Server Middlewares - Validate Schema', () => {
  let body;
  let req;
  let res;
  let next;
  let schema;
  beforeEach(() => {
    body = { body: 'example' };
    schema = Joi.object().keys({ body: Joi.string().valid('example') });
    req = { body };
    res = { send: jest.fn(), status: jest.fn() };
    next = jest.fn();
  });

  it('calls next if schema is valid', () => {
    validateSchema(schema, '')(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);

    req.body = undefined;
    validateSchema(schema, '')(req, res, next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('fails if schema is not valid', () => {
    req.body = 'invalid';
    validateSchema(schema, '')(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');

    req.body = 10;
    validateSchema(schema, '')(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(2);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');
  });
});
