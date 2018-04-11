import { Card, Divider, Grid, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class PureUserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageValid: props.profile.images && props.profile.images.length > 0,
    };
  }

  imageIsInvalid = () => this.setState({ imageValid: false });

  render() {
    return (
      <div>
        {
          this.state.imageValid ?
            <Image
              alt="hola"
              centered
              circular
              onError={this.imageIsInvalid}
              size={this.props.deviceMobile ? 'small' : 'medium'}
              src={this.props.profile.images[0].url}
            /> :
            <div>
              <Divider hidden />
              <Grid centered>
                <Icon
                  name="user circle outline"
                  size={this.props.deviceMobile ? 'huge' : 'massive'}
                />
              </Grid>
              <Divider hidden />
            </div>
        }
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.profile.displayName}
            </Card.Header>
            <Card.Meta>
              <span>
                {this.props.profile.type}
              </span>
            </Card.Meta>
            <Card.Description>
              <a href={this.props.profile.externalUrls.spotify} target="_blank">
                See in Spotify
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.profile.followers.total} followers
          </Card.Content>
        </Card>
      </div>
    );
  }
}

PureUserCard.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    externalUrls: PropTypes.object,
    followers: PropTypes.object,
    href: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.array,
    type: PropTypes.string,
    uri: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ deviceMobile, user }) => ({
  deviceMobile,
  profile: user.profile,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureUserCard);
