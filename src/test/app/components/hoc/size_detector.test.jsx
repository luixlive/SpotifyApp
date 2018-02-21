import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';

import { SizeDetector } from './../../../../app/components/hoc';
import initialState from './../../initial_state';

describe('App Components HOC - SizeDetector', () => {
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

  it('contains props', () => {
    expect(wrapper.find(ComposedComponent).prop('deviceTypeChanged').length)
      .toEqual(1);
  });
});
