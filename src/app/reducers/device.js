import { DEVICE_TYPE_CHANGED } from './../actions/types';
import isDeviceMobile from './../util/is_device_mobile';

export default function (state = isDeviceMobile(window.innerWidth), action) {
  switch (action.type) {
    case DEVICE_TYPE_CHANGED:
      return action.payload.isDeviceMobile;
    default:
      return state;
  }
}
