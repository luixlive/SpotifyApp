import { Card, Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable-next-line max-len */
import './../../../../style/components/containers/user_stats/artists/artist_card.less';

export const formatGenres = genres => genres.map(genre => (
  <div>
    {`${genre[0].toUpperCase()}${genre.slice(1)}`}<br />
  </div>
));

export const PureArtistCard = props => (
  <div>
    <Header as={props.deviceMobile ? 'h3' : 'h2'} floated="left">
      {props.place}
    </Header>
    <Card className="artist" fluid>
      <a
        href={props.spotifyUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image src={props.imageUrl} />
      </a>
      <Card.Content>
        <Card.Header>
          <Header as={props.deviceMobile ? 'h4' : 'h3'}>
            <a
              href={props.spotifyUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {props.name}
            </a>
          </Header>
        </Card.Header>
        <Card.Meta>
          <Header.Subheader as={props.deviceMobile ? 'h5' : 'h4'}>
            {formatGenres(props.genres)}
          </Header.Subheader>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        Followers: {props.followers}
      </Card.Content>
    </Card>
  </div>
);

PureArtistCard.defaultProps = {
  followers: 0,
  genres: [],
  imageUrl: null,
  name: '',
  spotifyUrl: null,
};

PureArtistCard.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  followers: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  place: PropTypes.number.isRequired,
  spotifyUrl: PropTypes.string,
};

const mapStateToProps = ({ deviceMobile }) => ({ deviceMobile });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureArtistCard);
