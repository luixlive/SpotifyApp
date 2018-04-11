import error from './../../test_utils/error';
import { mockUser } from './../../test_utils/mock_data';
import userReducer, { initialState } from './../../../app/reducers/user';
import * as types from './../../../app/actions/types';

describe('App Reducers - User', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it(types.LOAD_USER_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_SUCCEEDED,
      payload: { profile: mockUser, userAuthenticated: true },
    };
    const expectedState = {
      ...initialState,
      profile: mockUser,
      userAuthenticated: true,
      userLoaded: true,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER, () => {
    const action = { type: types.LOGOUT_USER, payload: {} };
    const expectedState = { ...initialState, loggingOutUser: true };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER_FAILED, () => {
    const action = { type: types.LOGOUT_USER_FAILED, payload: { error } };
    const expectedState = { ...initialState, loggingOutUser: false };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER_SUCCEEDED, () => {
    const action = { type: types.LOGOUT_USER_SUCCEEDED, payload: {} };
    const expectedState = { ...initialState, userLoaded: true };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
