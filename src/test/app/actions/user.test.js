import * as userActions from './../../../app/actions/user';
import * as types from './../../../app/actions/types';

describe('App Actions - User', () => {
  it(types.LOAD_USER, () => {
    const expectedAction = {
      type: types.LOAD_USER,
      payload: {},
    };
    expect(userActions.loadUser()).toEqual(expectedAction);
  });

  it(types.LOGOUT_USER, () => {
    const expectedAction = {
      type: types.LOGOUT_USER,
      payload: {},
    };
    expect(userActions.logoutUser()).toEqual(expectedAction);
  });
});
