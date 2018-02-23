import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';

import SizeDetector, {
  getSizeDetector,
} from './../../../../app/components/hoc/size_detector';
import initialState from './../../initial_state';

describe('App Components HOC - SizeDetector', () => {
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
      wrapper = mount((
        <Provider store={store}>
          <RenderedComponent />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(RenderedComponent).length).toEqual(1);
    });

    it('renders composed component', () => {
      expect(wrapper.find(ComposedComponent).length).toEqual(1);
    });

    it('contains prop deviceTypeChanged', () => {
      expect(wrapper.find(ComposedComponent).prop('deviceTypeChanged').length)
        .toEqual(1);
    });
  });
});
