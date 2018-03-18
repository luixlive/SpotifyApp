const request = require('superagent');

module.exports = {
  getUsersTopArtists: (accessToken, callback) => {
    request
      .get('https://api.spotify.com/v1/me/top/artists')
      .set('Authorization', `Bearer ${accessToken}`)
      .end(callback);
  },
};
