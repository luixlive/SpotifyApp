import _ from 'lodash';

import httpStatus from './../../../utils/http_status';
import mockUser from './../../test_utils/mock_user';
import { userLoggedIn } from './../../../server/middlewares';

describe('Server Middlewares - User Logged In', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { user: _.cloneDeep(mockUser) };
    res = { sendStatus: jest.fn() };
    next = jest.fn();
  });

  it('calls next if user is valid', () => {
    userLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('fails if no user is found', () => {
    req.user = undefined;
    userLoggedIn(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledTimes(1);
    expect(res.sendStatus.mock.calls[0][0]).toBe(httpStatus.UNAUTHORIZED);
  });

  it('fails if user data doesnt match schema', () => {
    req.user = { invalid: 'schema' };
    userLoggedIn(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledTimes(1);
    expect(res.sendStatus.mock.calls[0][0]).toBe(httpStatus.UNAUTHORIZED);
  });
});
