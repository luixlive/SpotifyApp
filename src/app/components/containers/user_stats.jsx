import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import loadUserStats from './../../actions/user_stats';

export class UserStats extends Component {
  componentDidMount() {
    this.props.loadUserStats();
  }

  render() {
    if (this.props.loadUserFinished && !this.props.isUserAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Segment basic className="body">
        <Dimmer active={!this.props.statsLoaded} inverted>
          <Loader inverted size="big" />
        </Dimmer>
        User stats
      </Segment>
    );
  }
}

UserStats.defaultProps = {
  statsLoaded: false,
};

UserStats.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  loadUserFinished: PropTypes.bool.isRequired,
  loadUserStats: PropTypes.func.isRequired,
  statsLoaded: PropTypes.bool,
};

const mapStateToProps = ({ user, userStats }) => ({
  isUserAuthenticated: user.isUserAuthenticated,
  loadUserFinished: user.loadUserFinished,
  statsLoaded: userStats.statsLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUserStats: () => dispatch(loadUserStats()),
});

export const ConnectedUserStats =
  connect(mapStateToProps, mapDispatchToProps)(UserStats);

export default withRouter(ConnectedUserStats);
