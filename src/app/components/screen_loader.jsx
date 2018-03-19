import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import React from 'react';

const ScreenLoader = () => (
  <Segment basic className="body">
    <Dimmer active inverted >
      <Loader inverted size="big" />
    </Dimmer>
  </Segment>
);

export default ScreenLoader;
