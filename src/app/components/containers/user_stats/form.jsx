import { connect } from 'react-redux';
import { Form, Header, Radio, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { changeTracksTimeRange } from './../../../actions/user_stats';
import FORM_OPTIONS from './../../../util/constants';

export class PureForm extends Component {
  static TYPE_TRACKS = 'tracks';
  static TYPE_ARTISTS = 'artists';

  handleChange = timeRange => () => {
    switch (this.props.type) {
      case PureForm.TYPE_TRACKS:
        return this.props.changeTracksTimeRange(timeRange);
      case PureForm.TYPE_ARTISTS:
        return null;
      default:
        return null;
    }
  };

  isRadioChecked = (itemTimeRange) => {
    switch (this.props.type) {
      case PureForm.TYPE_TRACKS:
        return this.props.tracksTimeRange === itemTimeRange;
      case PureForm.TYPE_ARTISTS:
        return this.props.artistsTimeRange === itemTimeRange;
      default:
        return false;
    }
  }

  render() {
    const radioButtons = [
      { label: 'last month', value: FORM_OPTIONS.TIME_RANGE.SHORT_TERM },
      { label: 'last six months', value: FORM_OPTIONS.TIME_RANGE.MEDIUM_TERM },
      { label: 'begining of times', value: FORM_OPTIONS.TIME_RANGE.LONG_TERM },
    ].map(item => (
      <Form.Field key={item.value}>
        <Radio
          label={item.label}
          name="timeRange"
          checked={this.isRadioChecked(item.value)}
          onChange={this.handleChange(item.value)}
        />
      </Form.Field>
    ));

    return (
      <Segment color="green">
        <Form>
          <Header as="h3">Since</Header>
          <Form.Group grouped>
            {radioButtons}
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

PureForm.propTypes = {
  artistsTimeRange: PropTypes.string.isRequired,
  changeTracksTimeRange: PropTypes.func.isRequired,
  tracksTimeRange: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  tracksTimeRange: userStats.topTracks.timeRange,
  artistsTimeRange: userStats.topArtists.timeRange,
});

const mapDispatchToProps = dispatch => ({
  changeTracksTimeRange: timeRange =>
    dispatch(changeTracksTimeRange(timeRange)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureForm);
