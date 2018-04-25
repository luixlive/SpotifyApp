import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { ScreenLoader } from './../../../templates';
import TrackCard from './track_card';

export const PureTrackList = (props) => {
  if (props.reloading) {
    return <ScreenLoader />;
  }
  return (
    <Segment basic>
      <Grid>
        {props.tracks.map((track, index) => (
          <Grid.Column key={track.id} width={props.deviceMobile ? 16 : 8}>
            <TrackCard {...track} place={index + 1} />
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

PureTrackList.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  reloading: PropTypes.bool.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({
    album: PropTypes.object,
    artists: PropTypes.array,
    durationMs: PropTypes.number,
    spotifyUrl: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    trackNumber: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = ({ deviceMobile, userStats }) => ({
  deviceMobile,
  reloading: userStats.topTracks.reloading,
  tracks: userStats.topTracks.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTrackList);
