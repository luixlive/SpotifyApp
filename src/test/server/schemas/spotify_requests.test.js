import _ from 'lodash';
import Joi from 'joi';

import { mockTopArtistsOrTracksOptions } from './../../test_utils/mock_data';
import { spotifyRequests } from './../../../server/schemas';

describe('Server Schemas - Spotify Request', () => {
  describe('Top Artists Or Tracks Options', () => {
    it('matches stored schema', () => {
      const result = Joi.validate(
        _.cloneDeep(mockTopArtistsOrTracksOptions),
        spotifyRequests.topArtistsOrTracksOptions,
      );
      expect(result.error).toBeNull();
    });

    it('allows undefined in optional fields', () => {
      const options = _.cloneDeep(mockTopArtistsOrTracksOptions);
      options.limit = undefined;
      options.offset = undefined;
      options.timeRange = undefined;
      const result = Joi.validate(
        options,
        spotifyRequests.topArtistsOrTracksOptions,
      );
      expect(result.error).toBeNull();
    });

    it('doesnt match invalid schemas', () => {
      let options = _.cloneDeep(mockTopArtistsOrTracksOptions);
      options.limit = 0;
      let result = Joi.validate(
        options,
        spotifyRequests.topArtistsOrTracksOptions,
      );
      expect(result.error).toBeTruthy();

      options = _.cloneDeep(mockTopArtistsOrTracksOptions);
      options.offset = 2.3;
      result = Joi.validate(options, spotifyRequests.topArtistsOrTracksOptions);
      expect(result.error).toBeTruthy();

      options = _.cloneDeep(mockTopArtistsOrTracksOptions);
      options.timeRange = 'very_long_time';
      result = Joi.validate(options, spotifyRequests.topArtistsOrTracksOptions);
      expect(result.error).toBeTruthy();

      options = _.cloneDeep(mockTopArtistsOrTracksOptions);
      options.limit = 'five';
      result = Joi.validate(options, spotifyRequests.topArtistsOrTracksOptions);
      expect(result.error).toBeTruthy();
    });
  });
});
