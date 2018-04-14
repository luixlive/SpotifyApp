import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import TrackForm from './form';
import TrackList from './track_list';

export const PureTracks = props => (
  <div>
    {
      props.deviceMobile ?
        <div>
          <TrackForm />
          <TrackList />
        </div> :
        <Grid columns={2}>
          <Grid.Column width={4}>
            <TrackForm />
          </Grid.Column>
          <Grid.Column width={12}>
            <TrackList />
          </Grid.Column>
        </Grid>
    }
  </div>
);

PureTracks.propTypes = { deviceMobile: PropTypes.bool.isRequired };

const mapStateToProps = ({ deviceMobile }) => ({ deviceMobile });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureTracks);

