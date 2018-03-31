import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import loadUserStats from './../../actions/user_stats';
import ScreenLoader from './../screen_loader';

export class PureUserStats extends Component {
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

PureUserStats.propTypes = {
  loadUserStats: PropTypes.func.isRequired,
  statsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  statsLoaded: userStats.statsLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUserStats: () => dispatch(loadUserStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureUserStats);
