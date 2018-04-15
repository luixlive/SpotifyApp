import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Artists from './artists';
import Form from './form';
import { PAGE_TYPES } from './../../../util/constants';
import Tracks from './tracks';

export class PureTracksArtistsTemplate extends Component {
  renderPage = () => {
    switch (this.props.type) {
      case PAGE_TYPES.TYPE_TRACKS:
        return <Tracks />;
      case PAGE_TYPES.TYPE_ARTISTS:
        return <Artists />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {
          this.props.deviceMobile ?
            <div>
              <Form type={this.props.type} />
              {this.renderPage()}
            </div> :
            <Grid columns={2}>
              <Grid.Column width={4}>
                <Form type={this.props.type} />
              </Grid.Column>
              <Grid.Column width={12}>
                {this.renderPage()}
              </Grid.Column>
            </Grid>
        }
      </div>
    );
  }
}

PureTracksArtistsTemplate.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ deviceMobile }) => ({ deviceMobile });

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PureTracksArtistsTemplate);
