import { DEVICE_TYPE_CHANGED } from './../actions/types';
import isDeviceMobile from './../util/is_device_mobile';

export const initialState = isDeviceMobile(window.innerWidth);

export default function (state = initialState, action) {
  switch (action.type) {
    case DEVICE_TYPE_CHANGED:
      return action.payload.isDeviceMobile;
    default:
      return state;
  }
}
