import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import addRouterProps from './../../../test_utils/add_router_props';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import {
  sizeDetector as componentProps,
} from './../../../test_utils/components_props';
import SizeDetector, {
  getSizeDetector,
} from './../../../../app/components/hoc/size_detector';
import * as types from './../../../../app/actions/types';

describe('App Components HOC - SizeDetector', () => {
  describe('Snapshots', () => {
    it('renders', () => {
      const props = _.cloneDeep(componentProps);
      const SizeDetectorComponent = getSizeDetector(() => <div />);
      const rendered =
        renderer.create(<SizeDetectorComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('should call deviceTypeChanged on resize events', () => {
      const deviceTypeChanged = jest.fn();
      const SizeDetectorComponent = getSizeDetector(() => <div />);
      mount(<SizeDetectorComponent deviceTypeChanged={deviceTypeChanged} />);

      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      expect(deviceTypeChanged).toHaveBeenCalledTimes(1);

      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
      expect(deviceTypeChanged).toHaveBeenCalledTimes(2);

      global.innerWidth = 700;
      global.dispatchEvent(new Event('resize'));
      expect(deviceTypeChanged).toHaveBeenCalledTimes(2);
    });

    it('shouldnt call deviceTypeChanged after componentWillUnmount', () => {
      const deviceTypeChanged = jest.fn();
      const SizeDetectorComponent = getSizeDetector(() => <div />);
      mount(<SizeDetectorComponent deviceTypeChanged={deviceTypeChanged} />)
        .unmount();

      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      expect(deviceTypeChanged).toHaveBeenCalledTimes(0);

      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
      expect(deviceTypeChanged).toHaveBeenCalledTimes(0);
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    const ComposedComponent = () => <div>Component</div>;
    let RenderedComponent;
    let store;
    let wrapper;
    beforeAll(() => {
      store = mockStore(initialState);
      RenderedComponent = SizeDetector(ComposedComponent);
      wrapper = mount(injectRouter(() => (
        <Provider store={store}>
          <RenderedComponent />
        </Provider>
      )));
    });

    it('renders', () => {
      expect(wrapper.find(RenderedComponent).length).toEqual(1);
    });

    it('matches initial state', () => {
      const props = addRouterProps(componentProps);
      expect(Object.keys(wrapper.find('SizeDetector').props()))
        .toEqual(Object.keys(props));
    });

    it('dispatches deviceTypeChanged', () => {
      expect(store.getActions().length).toBe(0);
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));

      const expectedAction = {
        type: types.DEVICE_TYPE_CHANGED,
        payload: { isDeviceMobile: true },
      };
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});
