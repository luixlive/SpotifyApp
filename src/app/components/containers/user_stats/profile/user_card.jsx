import { Card, Divider, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class PureUserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageValid: Boolean(props.profile.imageUrl),
    };
  }

  imageIsInvalid = () => this.setState({ imageValid: false });

  render() {
    return (
      <Grid columns={this.props.deviceMobile ? 1 : 3}>
        {!this.props.deviceMobile && <Grid.Column width={4} />}
        <Grid.Column width={this.props.deviceMobile ? 16 : 8}>
          {
            this.state.imageValid ?
              <Image
                centered
                circular
                onError={this.imageIsInvalid}
                size={this.props.deviceMobile ? 'small' : 'small'}
                src={this.props.profile.imageUrl}
              /> :
              <div>
                <Divider hidden />
                <Icon
                  name="user circle outline"
                  size={this.props.deviceMobile ? 'huge' : 'massive'}
                />
                <Divider hidden />
              </div>
          }
          <Card fluid>
            <Card.Content textAlign="center">
              <Card.Header>
                <Header as={this.props.deviceMobile ? 'h2' : 'h1'}>
                  {this.props.profile.displayName}
                </Header>
              </Card.Header>
              <Card.Meta>
                <Header.Subheader as={this.props.deviceMobile ? 'h4' : 'h3'}>
                  {this.props.profile.type} (
                  <a
                    href={this.props.profile.spotifyUrl}
                    target="_blank"
                  >
                    {this.props.profile.id}
                  </a>)
                </Header.Subheader>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra textAlign="center">
              {this.props.profile.followers} followers
            </Card.Content>
          </Card>
        </Grid.Column>
        {!this.props.deviceMobile && <Grid.Column width={4} />}
      </Grid>
    );
  }
}

PureUserCard.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    followers: PropTypes.number,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    spotifyUrl: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ deviceMobile, user }) => ({
  deviceMobile,
  profile: user.profile,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureUserCard);
