import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const PureMessage = props => (
  <Container textAlign="center">
    <Header
      as="h1"
      style={{
        fontSize: props.deviceMobile ? '2em' : '4em',
        marginTop: props.deviceMobile ? '1em' : '1.5em',
      }}
    >
      {props.title}
    </Header>
    <Header as={props.deviceMobile ? 'h3' : 'h2'} >
      {props.children}
    </Header>
  </Container>
);

PureMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  deviceMobile: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ deviceMobile }) => ({ deviceMobile });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureMessage);
