import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import UserCard, {
  PureUserCard,
/* eslint-disable-next-line max-len */
} from './../../../../../../app/components/containers/user_stats/profile/user_card';
import initialState from './../../../../../test_utils/initial_state';
import {
  userCard as componentProps,
} from './../../../../../test_utils/components_props';

describe('App Components - User Card', () => {
  const mockStore = configureStore();
  let props;
  let store;
  beforeEach(() => {
    props = _.cloneDeep(componentProps);
    store = mockStore(initialState);
  });

  describe('Snapshots', () => {
    it('renders no mobile and image invalid', () => {
      const rendered = renderer.create(<PureUserCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile and image invalid', () => {
      props.deviceMobile = true;
      const rendered = renderer.create(<PureUserCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders no mobile and image valid', () => {
      props.profile.imageUrl = 'url';
      const rendered = renderer.create(<PureUserCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile and image valid', () => {
      props.deviceMobile = true;
      props.profile.imageUrl = 'url';
      const rendered = renderer.create(<PureUserCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('sets state depending on images in profile', () => {
      let wrapper = shallow(<PureUserCard {...props} />);
      expect(wrapper.state().imageValid).toBeFalsy();

      props.profile.imageUrl = 'url';
      wrapper = shallow(<PureUserCard {...props} />);
      expect(wrapper.state().imageValid).toBeTruthy();
    });

    it('updates state if there is an error while loading image', () => {
      props.profile.imageUrl = 'url';
      const wrapper = shallow(<PureUserCard {...props} />);
      expect(wrapper.state().imageValid).toBeTruthy();
      wrapper.find('Image').simulate('error');
      expect(wrapper.state().imageValid).toBeFalsy();
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <UserCard />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureUserCard).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureUserCard).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
