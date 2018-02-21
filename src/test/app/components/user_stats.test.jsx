import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import UserStats from './../../../app/components/user_stats';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    it('renders', () => {
      const rendered = renderer.create(<UserStats />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    describe('General', () => {
      let wrapper;
      beforeAll(() => {
        wrapper = shallow(<UserStats />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      it('renders dummy text', () => {
        expect(wrapper.find('div').text()).toEqual('User stats');
      });
    });
  });
});
