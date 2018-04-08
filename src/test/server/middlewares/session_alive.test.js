import _ from 'lodash';

import httpStatus from './../../../utils/http_status';
import { mockUser } from './../../test_utils/mock_data';
import { sessionAlive } from './../../../server/middlewares';
import { SESSION_EXPIRED } from './../../../server/util/error_responses';

describe('Server Middlewares - Session Alive', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { user: _.cloneDeep(mockUser) };
    res = { send: jest.fn(), status: jest.fn() };
    next = jest.fn();
  });

  it('calls next if session has not expired', () => {
    req.user.expires = Date.now() + (60 * 60 * 1000);
    sessionAlive(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('fails if session expired or will expire in less than a minute', () => {
    req.user.expired = Date.now() - 1000;
    sessionAlive(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(httpStatus.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toEqual({ error: SESSION_EXPIRED });

    req.user.expired = Date.now() + 1000;
    sessionAlive(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(2);
    expect(res.status.mock.calls[1][0]).toBe(httpStatus.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls[1][0]).toEqual({ error: SESSION_EXPIRED });
  });
});
