import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../../../test_utils/initial_state';
import * as types from './../../../../../app/actions/types';
import Form, {
  PureForm,
} from './../../../../../app/components/containers/user_stats/form';
import {
  form as componentProps,
} from './../../../../test_utils/components_props';

describe('App Components - Form', () => {
  describe('Snapshots', () => {
    it('renders', () => {
      const props = _.cloneDeep(componentProps);
      const rendered = renderer.create(<PureForm {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    let props;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders the values for the current type', () => {
      props.artistsTimeRange = 'medium_term';
      const wrapper = mount(<PureForm {...props} />);
      expect(wrapper.props().type).toEqual('tracks');
      expect(wrapper.find('Radio').get(0).props.checked).toBeTruthy();
      expect(wrapper.find('Radio').get(1).props.checked).toBeFalsy();
      expect(wrapper.find('Radio').get(2).props.checked).toBeFalsy();

      wrapper.setProps({ type: 'artists' });
      expect(wrapper.props().type).toEqual('artists');
      expect(wrapper.find('Radio').get(0).props.checked).toBeFalsy();
      expect(wrapper.find('Radio').get(1).props.checked).toBeTruthy();
      expect(wrapper.find('Radio').get(2).props.checked).toBeFalsy();
    });

    it('marks checked values as false if type is unknown', () => {
      props.type = 'unknown';
      const wrapper = shallow(<PureForm {...props} />);
      expect(wrapper.find('Radio').get(0).props.checked).toBeFalsy();
      expect(wrapper.find('Radio').get(1).props.checked).toBeFalsy();
      expect(wrapper.find('Radio').get(2).props.checked).toBeFalsy();
    });

    it('returns null if an item is clicked but type is unknown', () => {
      props.type = 'unknown';
      const wrapper = shallow(<PureForm {...props} />);
      expect(wrapper.instance().handleChange()()).toBeNull();
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeAll(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <Form type="tracks" />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureForm).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureForm).props()))
        .toEqual(Object.keys(componentProps));
    });

    it('dispatches changeTracksTimeRange', () => {
      expect(store.getActions().length).toBe(0);
      wrapper.find('Radio').at(1).simulate('change');

      let expectedAction = {
        type: types.CHANGE_TRACKS_TIME_RANGE,
        payload: { timeRange: 'medium_term' },
      };
      expect(store.getActions()[0]).toEqual(expectedAction);

      wrapper.find('Radio').at(2).simulate('change');

      expectedAction = {
        type: types.CHANGE_TRACKS_TIME_RANGE,
        payload: { timeRange: 'long_term' },
      };
      expect(store.getActions()[1]).toEqual(expectedAction);

      store = mockStore(_.merge({}, initialState, {
        userStats: { topTracks: { timeRange: 'long_term' } },
      }));
      wrapper = mount((
        <Provider store={store}>
          <Form type="tracks" />
        </Provider>
      ));
      wrapper.find('Radio').at(0).simulate('change');

      expectedAction = {
        type: types.CHANGE_TRACKS_TIME_RANGE,
        payload: { timeRange: 'short_term' },
      };
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});
