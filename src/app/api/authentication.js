export default {
  keepSessionAlive: {
    put: () => window.fetch('/api/authentication/keepSessionAlive', {
      credentials: 'same-origin',
      method: 'PUT',
    }),
  },
  logout: {
    post: () => window.fetch('/api/authentication/logout', {
      credentials: 'same-origin',
      method: 'POST',
    }),
  },
  user: {
    get: () => window.fetch('/api/authentication/user', {
      credentials: 'same-origin',
      method: 'GET',
    }),
  },
};
