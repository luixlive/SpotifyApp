const _ = require('lodash');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const cleanTopArtistsProperties = topArtists => topArtists.map(artist => ({
  externalUrls: artist.external_urls,
  followers: artist.followers,
  genres: artist.genres,
  href: artist.href,
  id: artist.id,
  images: artist.images,
  name: artist.name,
  popularity: artist.popularity,
  type: artist.type,
  uri: artist.uri,
}));

const getUsersTopArtistsCallback = res => (err, spotifyRes) => {
  if (err || !_.has(spotifyRes, 'body.items')) {
    logger.debug(
      'Spotify getUsersTopArtists error: ',
      err || UNEXPECTED_SPOTIFY_RESPONSE,
    );
    res.status(httpStatus.BAD_GATEWAY);
    return res.send({ error: err || UNEXPECTED_SPOTIFY_RESPONSE });
  }

  const cleanTopArtists = cleanTopArtistsProperties(spotifyRes.body.items);
  logger.debug(
    'Spotify getUsersTopArtists:',
    JSON.stringify(cleanTopArtists),
  );
  return res.send(cleanTopArtists);
};

const topArtists = (req, res, getUsersTopArtists) => {
  logger.debug(`api/stats/topArtists: ${req.logUser}`);
  getUsersTopArtists(
    req.user.accessToken,
    getUsersTopArtistsCallback(res),
    req.query,
  );
};

module.exports = {
  getUsersTopArtistsCallback,
  topArtists,
};
