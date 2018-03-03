import { LOAD_USER, LOGOUT_USER } from './types';

export const loadUser = () => (
  { type: LOAD_USER, payload: { } }
);

export const logoutUser = () => (
  { type: LOGOUT_USER, payload: { } }
);
