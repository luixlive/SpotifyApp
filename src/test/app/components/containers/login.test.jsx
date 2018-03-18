import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import {
  ConnectedLogin,
  Login,
} from './../../../../app/components/containers/login';
import initialState from './../../../test_utils/initial_state';
import {
  loginContainer as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - Login', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered = renderer.create(<Login {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.isDeviceMobile = true;
      const rendered = renderer.create(<Login {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    describe('General', () => {
      let wrapper;
      beforeAll(() => {
        const props = _.cloneDeep(componentProps);
        wrapper = shallow(<Login {...props} />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      it('renders welcome text', () => {
        expect(wrapper.find('Header').get(0).props.as).toEqual('h1');
        expect(wrapper.find('Header').get(0).props.children).toEqual('Welcome');
      });

      it('renders the sign in text', () => {
        expect(wrapper.find('Header').get(1).props.children)
          .toEqual('Please sign in with Spotify to start.');
      });
    });

    describe('Not mobile', () => {
      it('renders the sign in text as h2', () => {
        const wrapper = shallow(<Login isDeviceMobile={false} />);
        expect(wrapper.find('Header').get(1).props.as).toEqual('h2');
      });
    });

    describe('Mobile', () => {
      it('renders the sign in text as h3', () => {
        const wrapper = shallow(<Login isDeviceMobile />);
        expect(wrapper.find('Header').get(1).props.as).toEqual('h3');
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
          <ConnectedLogin />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(ConnectedLogin).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(Login).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
