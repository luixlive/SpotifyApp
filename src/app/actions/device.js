import { DEVICE_TYPE_CHANGED } from './types';

export default isDeviceMobile => (
  { type: DEVICE_TYPE_CHANGED, payload: { isDeviceMobile } }
);
