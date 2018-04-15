import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { loadUserStats } from './../../../actions/user_stats';
import Profile from './profile';
import { ScreenLoader } from './../../templates';
import TracksArtistsTemplate from './tracks_artists_template';

export class PureUserStats extends Component {
  static PROFILE = 0;
  static TRACKS = 1;
  static ARTISTS = 2;

  constructor(props) {
    super(props);

    this.state = { activeMenuItem: PureUserStats.PROFILE };
  }

  componentDidMount() {
    if (!this.props.statsLoaded) {
      this.props.loadUserStats();
    }
  }

  handleItemClick = item => () => this.setState({ activeMenuItem: item });

  renderContent() {
    switch (this.state.activeMenuItem) {
      case PureUserStats.PROFILE:
        return <Profile />;
      case PureUserStats.TRACKS:
        return <TracksArtistsTemplate type="tracks" />;
      case PureUserStats.ARTISTS:
        return <TracksArtistsTemplate type="artists" />;
      default:
        return null;
    }
  }

  render() {
    if (this.props.statsLoaded) {
      return (
        <div>
          <Menu pointing secondary widths={3}>
            <Menu.Item
              name={this.props.displayName}
              active={this.state.activeMenuItem === PureUserStats.PROFILE}
              onClick={this.handleItemClick(PureUserStats.PROFILE)}
            />
            <Menu.Item
              name="Tracks"
              active={this.state.activeMenuItem === PureUserStats.TRACKS}
              onClick={this.handleItemClick(PureUserStats.TRACKS)}
            />
            <Menu.Item
              name="Artists"
              active={this.state.activeMenuItem === PureUserStats.ARTISTS}
              onClick={this.handleItemClick(PureUserStats.ARTISTS)}
            />
          </Menu>
          {this.renderContent()}
        </div>
      );
    }
    return <ScreenLoader text="Loading..." />;
  }
}

PureUserStats.propTypes = {
  displayName: PropTypes.string.isRequired,
  loadUserStats: PropTypes.func.isRequired,
  statsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user, userStats }) => ({
  displayName: user.profile.displayName,
  statsLoaded: userStats.statsLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUserStats: () => dispatch(loadUserStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureUserStats);
