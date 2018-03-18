export default {
  user: {
    get: () => window.fetch('/api/authentication/user', { method: 'GET' }),
  },
  logout: {
    get: () => window.fetch('/api/authentication/logout', { method: 'GET' }),
  },
};
