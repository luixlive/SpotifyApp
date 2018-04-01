import error from './../../test_utils/error';
import errorReducer, {
  initialState,
} from './../../../app/reducers/error';
import * as types from './../../../app/actions/types';

describe('App Reducers - Error', () => {
  it('should return initial state', () => {
    expect(errorReducer(undefined, {})).toEqual(initialState);
  });

  it(types.CLEAR_ERROR, () => {
    const action = { type: types.CLEAR_ERROR, payload: {} };
    const expectedState = '';
    expect(errorReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_FAILED, () => {
    const action = { type: types.LOAD_USER_FAILED, payload: { error } };
    const expectedState = error;
    expect(errorReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_FAILED, () => {
    const action = { type: types.LOAD_USER_STATS_FAILED, payload: { error } };
    const expectedState = error;
    expect(errorReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOGOUT_USER_FAILED, () => {
    const action = { type: types.LOGOUT_USER_FAILED, payload: { error } };
    const expectedState = error;
    expect(errorReducer(undefined, action)).toEqual(expectedState);
  });
});
