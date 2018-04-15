import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ScreenLoader } from './../../../templates';

export const PureArtistList = (props) => {
  if (props.reloading) {
    return <ScreenLoader />;
  }
  return (
    <ol>
      {props.artists.map(artist => (
        <li key={artist.name}>{artist.name}</li>
      ))}
    </ol>
  );
};

PureArtistList.propTypes = {
  reloading: PropTypes.bool.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    followers: PropTypes.number,
    genres: PropTypes.array,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    spotifyUrl: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  reloading: userStats.topArtists.reloading,
  artists: userStats.topArtists.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureArtistList);
