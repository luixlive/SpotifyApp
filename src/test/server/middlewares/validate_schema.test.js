import config from 'config';
import Joi from 'joi';

import httpStatus from './../../../utils/http_status';
import { validateSchema } from './../../../server/middlewares';

const SCHEMA_TYPES = config.get('SCHEMA_TYPES');

describe('Server Middlewares - Validate Schema', () => {
  let req;
  let res;
  let next;
  let schema;
  beforeEach(() => {
    schema = Joi.object().keys({ key: Joi.string().valid('value') });
    req = { body: { key: 'value' }, query: { key: 'value' } };
    res = { send: jest.fn(), status: jest.fn() };
    next = jest.fn();
  });

  it('calls next if body schema is valid', () => {
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_BODY)(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);

    req.body = undefined;
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_BODY)(req, res, next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('fails if body schema is not valid', () => {
    req.body = { key: 'invalid' };
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_BODY)(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');

    req.body = 10;
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_BODY)(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(2);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');
  });

  it('calls next if query schema is valid', () => {
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_QUERY)(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);

    req.query = undefined;
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_QUERY)(req, res, next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('fails if query schema is not valid', () => {
    req.query = { key: 'invalid' };
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_QUERY)(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');

    req.query = 10;
    validateSchema(schema, '', SCHEMA_TYPES.TYPE_QUERY)(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(2);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls[0][0]).toHaveProperty('error');
  });
});
