import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { AppFooter } from './../';
import { AppHeaderContainer } from './../containers';
import { loadUser } from './../../actions/user';
import ScreenLoader from './../screen_loader';
import { SizeDetector } from './../hoc';

export class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  renderBody() {
    if (this.props.userLoaded) {
      return this.props.children;
    }
    return <ScreenLoader />;
  }

  render() {
    return (
      <div>
        <AppHeaderContainer />
        {this.renderBody()}
        <AppFooter />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  loadUser: PropTypes.func.isRequired,
  userLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({ userLoaded: user.userLoaded });

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
});

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default SizeDetector(ConnectedApp);
