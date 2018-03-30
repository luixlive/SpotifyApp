import { DEVICE_TYPE_CHANGED } from './types';

export default deviceMobile => (
  { type: DEVICE_TYPE_CHANGED, payload: { deviceMobile } }
);
