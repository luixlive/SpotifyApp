import deviceChanged from './../../../app/actions/device';
import * as types from './../../../app/actions/types';

describe('App Actions - Device', () => {
  it(types.DEVICE_TYPE_CHANGED, () => {
    const isDeviceMobile = true;
    const expectedAction = {
      type: types.DEVICE_TYPE_CHANGED,
      payload: { isDeviceMobile },
    };
    expect(deviceChanged(isDeviceMobile)).toEqual(expectedAction);
  });
});
