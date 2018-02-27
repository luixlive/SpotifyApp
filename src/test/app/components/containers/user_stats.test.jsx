import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import UserStatsConnected, {
  UserStats,
} from './../../../../app/components/containers/user_stats';
import initialState from './../../initial_state';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    it('renders', () => {
      const props = { loadUserStats: () => {} };
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    describe('General', () => {
      let wrapper;
      beforeAll(() => {
        const props = { loadUserStats: () => {} };
        wrapper = shallow(<UserStats {...props} />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      it('renders loader', () => {
        expect(wrapper.find('Loader').length).toEqual(1);
        expect(wrapper.find('Loader').prop('children')).toEqual('Loading');
      });

      it('calls loadUserStats when componentDidMount', () => {
        const spy = jest.fn();
        mount(<UserStats loadUserStats={spy} />);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <UserStatsConnected />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(UserStatsConnected).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(wrapper.find(UserStats).prop('loadUserStats'))
        .toBeInstanceOf(Function);
    });
  });
});
