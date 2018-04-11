import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

export const PureProfile = props => (
  <ul>
    {_.map(props.profile, (value, key) => (
      <li>
        {key}: {JSON.stringify(value)}
      </li>
    ))}
  </ul>
);

PureProfile.propTypes = {
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    externalUrls: PropTypes.object,
    followers: PropTypes.object,
    href: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.array,
    type: PropTypes.string,
    uri: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({
  profile: user.profile,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureProfile);
