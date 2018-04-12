import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

export const PureArtists = props => (
  <ol>
    {props.artists.map(artist => (
      <li>{artist.name}</li>
    ))}
  </ol>
);

PureArtists.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    followers: PropTypes.number,
    genres: PropTypes.object,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    spotifyUrl: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  artists: userStats.topArtists.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureArtists);
