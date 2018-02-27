import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import loadUserStats from './../../actions/user_stats';

export class UserStats extends Component {
  componentDidMount() {
    this.props.loadUserStats();
  }

  render() {
    return (
      <Segment basic className="body">
        <Dimmer active={!this.props.statsLoaded} inverted>
          <Loader inverted size="big">Loading</Loader>
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
  loadUserStats: PropTypes.func.isRequired,
  statsLoaded: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  loadUserStats: () => dispatch(loadUserStats()),
});

export default connect(null, mapDispatchToProps)(UserStats);
