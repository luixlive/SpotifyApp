import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { Message, ScreenLoader } from './../../../templates';
import ArtistCard from './artist_card';

export const PureArtistList = (props) => {
  if (props.reloading) {
    return <ScreenLoader />;
  } else if (props.error) {
    return <Message title="Error :(">{props.error}</Message>;
  }
  return (
    <Segment basic>
      <Grid>
        {props.artists.map((artist, index) => (
          <Grid.Column key={artist.id} width={props.deviceMobile ? 16 : 8}>
            <ArtistCard {...artist} place={index + 1} />
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

PureArtistList.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    followers: PropTypes.number,
    genres: PropTypes.array,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    spotifyUrl: PropTypes.string,
  })).isRequired,
  reloading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ deviceMobile, userStats }) => ({
  deviceMobile,
  error: userStats.topArtists.error,
  reloading: userStats.topArtists.reloading,
  artists: userStats.topArtists.list,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureArtistList);
