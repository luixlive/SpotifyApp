import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Footer } from './../';
import { Header } from './../containers';
import { loadUser } from './../../actions/user';
import ScreenLoader from './../screen_loader';
import { SizeDetector } from './../hoc';

export class PureApp extends Component {
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
        <Header />
        {this.renderBody()}
        <Footer />
      </div>
    );
  }
}

PureApp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loadUser: PropTypes.func.isRequired,
  userLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({ userLoaded: user.userLoaded });

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
});

export const ConnectedApp =
  connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default withRouter(SizeDetector(ConnectedApp));
