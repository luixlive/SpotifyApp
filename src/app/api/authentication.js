export default {
  user: {
    get: () => window.fetch('/api/authentication/user', {
      credentials: 'same-origin',
      method: 'GET',
    }),
  },
  logout: {
    get: () => window.fetch('/api/authentication/logout', {
      credentials: 'same-origin',
      method: 'GET',
    }),
  },
};
