const _ = require('lodash');
const config = require('config');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const { TOP_ARTISTS, TOP_TRACKS } = config.get('CONSTANTS');

const cleanTopArtistsProperties = topArtists => topArtists.map(artist => ({
  ..._.omit(artist, ['external_urls']),
  externalUrls: artist.external_urls,
}));

const cleanTopTracksProperties = topTracks => topTracks.map(track => ({
  ..._.omit(track, [
    'disc_number',
    'duration_ms',
    'external_ids',
    'external_urls',
    'is_playable',
    'preview_url',
    'track_number',
  ]),
  artists: track.artists.map(artist => ({
    ..._.omit(artist, ['external_urls']),
    externalUrls: artist.external_urls,
  })),
  discNumber: track.disc_number,
  durationMs: track.duration_ms,
  externalIds: track.external_ids,
  externalUrls: track.external_urls,
  isPlayable: track.is_playable,
  previewUrl: track.preview_url,
  trackNumber: track.track_number,
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
