const _ = require('lodash');
const config = require('config');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const { TOP_ARTISTS, TOP_TRACKS } = config.get('CONSTANTS');

const cleanTopArtistsProperties = topArtists => topArtists.map(artist => ({
  spotifyUrl: _.get(artist, 'external_urls.spotify'),
  followers: _.get(artist, 'followers.total'),
  genres: _.get(artist, 'genres', []),
  id: _.get(artist, 'id'),
  imageUrl: _.get(artist, 'images[0].url'),
  name: _.get(artist, 'name'),
  popularity: _.get(artist, 'popularity'),
}));

const cleanTopTracksProperties = topTracks => topTracks.map(track => ({
  album: {
    spotifyUrl: _.get(track, 'album.external_urls.spotify'),
    imageUrl: _.get(track, 'album.images[0].url'),
    name: _.get(track, 'album.name'),
  },
  artists: _.get(track, 'artists', []).map(artist => ({
    spotifyUrl: _.get(artist, 'external_urls.spotify'),
    id: _.get(artist, 'id'),
    name: _.get(artist, 'name'),
  })),
  durationMs: _.get(track, 'duration_ms'),
  spotifyUrl: _.get(track, 'external_urls.spotify'),
  id: _.get(track, 'id'),
  name: _.get(track, 'name'),
  popularity: _.get(track, 'popularity'),
  trackNumber: _.get(track, 'track_number'),
}));

const topArtistsOrTracks = (retrieve, service) => (req, res) => {
  const { cleanProperties, endpoint } = {
    TOP_ARTISTS: {
      cleanProperties: cleanTopArtistsProperties,
      endpoint: 'topArtists',
    },
    TOP_TRACKS: {
      cleanProperties: cleanTopTracksProperties,
      endpoint: 'topTracks',
    },
  }[retrieve];

  logger.debug(`api/stats/${endpoint}: ${req.logUser}`);
  service(req.user.accessToken, req.query, (err, spotifyResponse) => {
    const body = _.get(spotifyResponse, 'body', {});
    if (err || !body.items) {
      logger.debug(
        `Spotify ${endpoint} error: `,
        err || UNEXPECTED_SPOTIFY_RESPONSE,
      );
      res.status(httpStatus.BAD_GATEWAY);
      return res.send({ error: err || UNEXPECTED_SPOTIFY_RESPONSE });
    }

    const cleanedValues = cleanProperties(body.items);
    logger.debug(`Spotify ${endpoint}: `, JSON.stringify(cleanedValues));
    return res.send(cleanedValues);
  });
};

module.exports = {
  topArtists: service => topArtistsOrTracks(TOP_ARTISTS, service),
  topTracks: service => topArtistsOrTracks(TOP_TRACKS, service),
};
