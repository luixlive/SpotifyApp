import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export const NotFound = props => (
  <Container className="" textAlign="center">
    <Header
      as="h1"
      style={{
        fontSize: props.isDeviceMobile ? '2em' : '4em',
        marginTop: props.isDeviceMobile ? '1em' : '1.5em',
      }}
    >
    Error 404
    </Header>
    <Header as={props.isDeviceMobile ? 'h3' : 'h2'}>
      Page not found, go back to <Link to="/stats">home</Link> page.
    </Header>
  </Container>
);

NotFound.propTypes = {
  isDeviceMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isDeviceMobile }) => ({ isDeviceMobile });

const mapDispatchToProps = () => ({});

export const ConnectedNotFound =
  connect(mapStateToProps, mapDispatchToProps)(NotFound);

export default withRouter(ConnectedNotFound);
