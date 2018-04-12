import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

export const PureTracks = props => (
  <ol>
    {props.tracks.map(track => (
      <li>{track.name}</li>
    ))}
  </ol>
);

PureTracks.propTypes = {
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
  tracks: userStats.topTracks.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTracks);

