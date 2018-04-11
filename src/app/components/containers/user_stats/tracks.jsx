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
    albums: PropTypes.object,
    artists: PropTypes.array,
    discNumber: PropTypes.number,
    durationMs: PropTypes.number,
    explicit: PropTypes.bool,
    externalIds: PropTypes.object,
    externalUrls: PropTypes.object,
    href: PropTypes.string,
    id: PropTypes.string,
    isPlayable: PropTypes.bool,
    name: PropTypes.string,
    popularity: PropTypes.number,
    previewUrl: PropTypes.string,
    trackNumber: PropTypes.number,
    type: PropTypes.string,
    uri: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  tracks: userStats.topTracks.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTracks);

