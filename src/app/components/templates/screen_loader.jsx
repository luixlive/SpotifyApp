import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import './../../style/components/templates/screen_loader.less';

const ScreenLoader = props => (
  <Segment basic className="screen-loader">
    <Dimmer active inverted >
      <Loader inverted size="big">
        <Header as="h3" >
          {props.text}
        </Header>
      </Loader>
    </Dimmer>
  </Segment>
);

ScreenLoader.defaultProps = {
  text: 'Loading...',
};

ScreenLoader.propTypes = {
  text: PropTypes.string,
};

export default ScreenLoader;
