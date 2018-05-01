import React from 'react';
import { Segment } from 'semantic-ui-react';

import './../../style/components/containers/footer.less';

const Footer = () => (
  <Segment className="footer" textAlign="center">
    <p>
      This app uses the
      <a
        href="https://www.spotify.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' Spotify '}
      </a>
      API. Favicon made by
      <a
        href="https://www.flaticon.com/authors/gregor-cresnar"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' Gregor Cresnar '}
      </a>
      from
      <a
        href="https://www.flaticon.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' flaticon'}
      </a>
      . Contact me on
      <a
        href="https://twitter.com/LuisAlfonsoCHA"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' twitter'}
      </a>.
    </p>
  </Segment>
);

export default Footer;
