import error from './../../test_utils/error';
import httpStatus from './../../../utils/http_status';
import { statsController } from './../../../server/controllers';

describe('Server Controllers - Stats', () => {
  let response;
  let req;
  let res;
  let responseValue;
  let statusValue;
  let user;
  beforeEach(() => {
    response = { artists: ['1', '2'] };
    responseValue = undefined;
    statusValue = undefined;
    user = { accessToken: 'accessToken' };
    req = { user };
    res = {
      send: (value) => { responseValue = value; },
      status: (status) => { statusValue = status; },
    };
  });

  describe('Top Artists', () => {
    it('calls service to retrieve artists', () => {
      const service = jest.fn();
      statsController.topArtists(req, res, service);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.accessToken);
      expect(service.mock.calls[0][1]).toBeInstanceOf(Function);
    });

    it('returns top artists in callback', () => {
      const callback = statsController.getUsersTopArtistsCallback(res);
      callback(null, response);
      expect(responseValue).toBe(response);
    });

    it('returns internal server error when service returns error', () => {
      const callback = statsController.getUsersTopArtistsCallback(res);
      callback(error, response);
      expect(statusValue).toBe(httpStatus.INTERNAL_SERVER_ERROR);
      expect(responseValue.error).toBe(error);
    });
  });
});
