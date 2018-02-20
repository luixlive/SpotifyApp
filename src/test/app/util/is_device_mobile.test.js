import isDeviceMobile from './../../../app/util/is_device_mobile';

describe('App Util - IsDeviceMobile', () => {
  it('should return true if size <= 600', () => {
    expect(isDeviceMobile(600)).toBe(true);
    expect(isDeviceMobile(200)).toBe(true);
  });

  it('should return false if size > 600', () => {
    expect(isDeviceMobile(601)).toBe(false);
    expect(isDeviceMobile(800)).toBe(false);
  });
});
