import { Card, Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable-next-line max-len */
import './../../../../style/components/containers/user_stats/tracks/track_card.less';

export const formatArtists = artists => artists.map((artist, index, array) => (
  <a
    href={artist.spotifyUrl}
    key={artist.id}
    rel="noopener noreferrer"
    target="_blank"
  >
    {`${artist.name}${array.length === index + 1 ? '' : ', '}`}
  </a>
));

export const formatSongTime = (ms) => {
  const msInASecond = 1000;
  const secondsInAMinute = 60;

  const inSeconds = ms / msInASecond;
  const minutes = Math.floor(inSeconds / secondsInAMinute);
  let seconds = (inSeconds % secondsInAMinute).toString().split('.')[0];
  seconds = seconds.length === 1 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

export const PureTrackCard = props => (
  <div>
    <Header as={props.deviceMobile ? 'h3' : 'h2'} floated="left">
      {props.place}
    </Header>
    <Card className="track" fluid>
      <a
        href={props.album.spotifyUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image src={props.album.imageUrl} />
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
            {formatSongTime(props.durationMs)}
          </Header.Subheader>
        </Card.Meta>
        <Card.Description>
          <Header.Subheader as={props.deviceMobile ? 'h5' : 'h4'}>
            {formatArtists(props.artists)}
          </Header.Subheader>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {'Album: '}
        <a href={props.album.spotifyUrl}>
          {props.album.name}
        </a>
        <br />
        {`Number: ${props.trackNumber}`}
      </Card.Content>
    </Card>
  </div>
);

PureTrackCard.defaultProps = {
  album: {
    spotifyUrl: null,
    imageUrl: null,
    name: '',
  },
  artists: [],
  durationMs: 0,
  name: '',
  spotifyUrl: null,
  trackNumber: 0,
};

PureTrackCard.propTypes = {
  album: PropTypes.shape({
    spotifyUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    spotifyUrl: PropTypes.string,
    name: PropTypes.string,
  })),
  deviceMobile: PropTypes.bool.isRequired,
  durationMs: PropTypes.number,
  name: PropTypes.string,
  place: PropTypes.number.isRequired,
  spotifyUrl: PropTypes.string,
  trackNumber: PropTypes.number,
};

const mapStateToProps = ({ deviceMobile }) => ({ deviceMobile });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTrackCard);
