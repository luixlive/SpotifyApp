import deviceChanged from './../../../app/actions/device';
import * as types from './../../../app/actions/types';

describe('App Actions - Device', () => {
  it(types.DEVICE_TYPE_CHANGED, () => {
    const deviceMobile = true;
    const expectedAction = {
      type: types.DEVICE_TYPE_CHANGED,
      payload: { deviceMobile },
    };
    expect(deviceChanged(deviceMobile)).toEqual(expectedAction);
  });
});
