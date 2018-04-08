import error from './../../../app/actions/error';
import * as types from './../../../app/actions/types';

describe('App Actions - Error', () => {
  it(types.CLEAR_ERROR, () => {
    const expectedAction = {
      type: types.CLEAR_ERROR,
      payload: {},
    };
    expect(error()).toEqual(expectedAction);
  });
});
