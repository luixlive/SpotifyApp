import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import loadUserStats from './../../actions/user_stats';
import ScreenLoader from './../screen_loader';

export class UserStats extends Component {
  componentDidMount() {
    this.props.loadUserStats();
  }

  render() {
    if (this.props.statsLoaded) {
      return (
        <div>
          User stats
        </div>
      );
    }
    return <ScreenLoader />;
  }
}

UserStats.propTypes = {
  loadUserStats: PropTypes.func.isRequired,
  statsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  statsLoaded: userStats.statsLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUserStats: () => dispatch(loadUserStats()),
});

export const ConnectedUserStats =
  connect(mapStateToProps, mapDispatchToProps)(UserStats);

export default withRouter(ConnectedUserStats);
