import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import clearError from './../../actions/error';
import { loadUser } from './../../actions/user';
import { Message } from './../templates';

export class PureError extends Component {
  loadUserAndClearError = () => {
    this.props.clearError();
    this.props.loadUser();
  }

  render() {
    return (
      <Message title="Error :(">
        {this.props.error} Go back to
        <Link onClick={this.loadUserAndClearError} to="/"> Home</Link>.
      </Message>
    );
  }
}

PureError.propTypes = {
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearError()),
  loadUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureError);
