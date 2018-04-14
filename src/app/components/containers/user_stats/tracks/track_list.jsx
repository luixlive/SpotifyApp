import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ScreenLoader } from './../../../templates';

export const PureTrackList = (props) => {
  if (props.reloading) {
    return <ScreenLoader />;
  }
  return (
    <ol>
      {props.tracks.map(track => (
        <li key={track.name}>{track.name}</li>
      ))}
    </ol>
  );
};

PureTrackList.propTypes = {
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

const mapStateToProps = ({ userStats }) => ({
  reloading: userStats.topTracks.reloading,
  tracks: userStats.topTracks.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTrackList);
