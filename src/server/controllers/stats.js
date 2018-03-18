const request = require('superagent');

const topArtists = (req, res) => {
  request
    .get('https://api.spotify.com/v1/me/top/artists')
    .set('Authorization', `Bearer ${req.user.accessToken}`)
    .end((err, spotifyRes) => {
      if (err) return res.status(500).send({ error: err });

      return res.send(spotifyRes);
    });
};

module.exports = { topArtists };
