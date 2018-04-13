import React from 'react';
import { Segment } from 'semantic-ui-react';

const Footer = () => (
  <Segment className="footer" textAlign="center">
    <p>
      Favicon made by
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
        {' www.flaticon.com'}
      </a>.
    </p>
  </Segment>
);

export default Footer;
