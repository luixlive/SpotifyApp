import { connect } from 'react-redux';
import { Form, Header, Radio, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { changeTracksTimeRange } from './../../../../actions/user_stats';
import FORM_OPTIONS from './../../../../util/constants';

export class PureForm extends Component {
  handleChange = timeRange => () => this.props.changeTracksTimeRange(timeRange);

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
          checked={this.props.timeRange === item.value}
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
  changeTracksTimeRange: PropTypes.func.isRequired,
  timeRange: PropTypes.string.isRequired,
};

const mapStateToProps = ({ userStats }) => ({
  timeRange: userStats.topTracks.timeRange,
});

const mapDispatchToProps = dispatch => ({
  changeTracksTimeRange: timeRange =>
    dispatch(changeTracksTimeRange(timeRange)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureForm);
