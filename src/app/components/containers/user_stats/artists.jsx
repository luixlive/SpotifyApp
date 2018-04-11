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
    externalUrls: PropTypes.object,
    followers: PropTypes.object,
    genres: PropTypes.object,
    href: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.array,
    name: PropTypes.string,
    popularity: PropTypes.number,
    type: PropTypes.string,
    uri: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  artists: userStats.topArtists.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureArtists);
