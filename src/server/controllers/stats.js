const _ = require('lodash');
const config = require('config');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const { TOP_ARTISTS, TOP_TRACKS } = config.get('CONSTANTS');

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

const cleanTopTracksProperties = topTracks => topTracks.map(tracks => ({
  albums: tracks.albums,
  artists: tracks.artists,
  discNumber: tracks.disc_number,
  durationMs: tracks.duration_ms,
  explicit: tracks.explicit,
  externalIds: tracks.external_ids,
  externalUrls: tracks.external_urls,
  href: tracks.href,
  id: tracks.id,
  isPlayable: tracks.is_playable,
  name: tracks.name,
  popularity: tracks.popularity,
  previewUrl: tracks.preview_url,
  trackNumber: tracks.track_number,
  type: tracks.type,
  uri: tracks.uri,
}));

const topArtistsOrTracks = retrieve => (req, res, service) => {
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
  service(req.user.accessToken, req.query, (err, spotifyRes) => {
    if (err || !_.has(spotifyRes, 'body.items')) {
      logger.debug(
        `Spotify ${endpoint} error: `,
        err || UNEXPECTED_SPOTIFY_RESPONSE,
      );
      res.status(httpStatus.BAD_GATEWAY);
      return res.send({ error: err || UNEXPECTED_SPOTIFY_RESPONSE });
    }

    const cleanedValues = cleanProperties(spotifyRes.body.items);
    logger.debug(`Spotify ${endpoint}: `, JSON.stringify(cleanedValues));
    return res.send(cleanedValues);
  });
};

module.exports = {
  topArtists: topArtistsOrTracks(TOP_ARTISTS),
  topTracks: topArtistsOrTracks(TOP_TRACKS),
};
