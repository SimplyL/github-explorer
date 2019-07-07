import React from 'react';
import { shallow } from 'enzyme';
import Item from '../item';
import mock from './__mocks__/mocks';

const mockFn = jest.fn();

describe('Repository item component', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<Item item={mock} onClick={mockFn} />);
  });

  it('Should call onClick handler with correct params', async () => {
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledWith(mock.full_name);
  });

  it('Should reroute to github repository when label is clicked', async () => {
    window.location.assign = jest.fn();
    wrapper.find('AnchorButton').simulate('click', { stopPropagation: jest.fn() });
    expect(window.location.assign).toBeCalledWith(mock.html_url);
  });
});
