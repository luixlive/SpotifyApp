import deviceReducer, {
  initialState,
} from './../../../app/reducers/device';
import * as types from './../../../app/actions/types';

describe('App Reducers - Device', () => {
  it('should return initial state', () => {
    expect(deviceReducer(undefined, {})).toEqual(initialState);
  });

  it(types.DEVICE_TYPE_CHANGED, () => {
    const action = {
      type: types.DEVICE_TYPE_CHANGED,
      payload: { isDeviceMobile: true },
    };
    const expectedState = true;
    expect(deviceReducer(undefined, action)).toEqual(expectedState);
  });
});
