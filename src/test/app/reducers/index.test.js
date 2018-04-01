import { reducers } from './../../../app/reducers';
import deviceMobile from './../../../app/reducers/device';
import error from './../../../app/reducers/error';
import user from './../../../app/reducers/user';
import userStats from './../../../app/reducers/user_stats';

describe('App Reducers - Comination', () => {
  it('should contain every reducer', () => {
    const reducersToCombine = { deviceMobile, error, user, userStats };
    expect(reducers).toEqual(reducersToCombine);
  });
});
