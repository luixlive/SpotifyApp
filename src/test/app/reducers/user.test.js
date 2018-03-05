import userReducer, {
  initialState,
} from './../../../app/reducers/user';
import * as types from './../../../app/actions/types';

describe('App Reducers - User', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it(types.LOAD_USER_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_SUCCEEDED,
      payload: { isUserAuthenticated: true },
    };
    const expectedState = {
      ...initialState,
      isUserAuthenticated: true,
      loadUserFinished: true,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER, () => {
    const action = {
      type: types.LOGOUT_USER,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      loggingOutUser: true,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER_SUCCEEDED, () => {
    const action = {
      type: types.LOGOUT_USER_SUCCEEDED,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      isUserAuthenticated: false,
      loggingOutUser: false,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
