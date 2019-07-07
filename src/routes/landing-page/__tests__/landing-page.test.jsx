import React from 'react';
import { createMemoryHistory } from 'history';
import { shallow } from 'enzyme';
import LandingPage from '../index';

jest.mock('../../../util/helpers', () => ({
  getStargazerStatus: jest.fn().mockImplementation(() => Promise.resolve(false)),
  getContributorCount: jest.fn().mockImplementation(() => Promise.resolve(759)),
  constructUrl: jest.fn(),
}));

jest.mock('../../../util/fetch', () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve({
    items: [
      {
        full_name: 'facebook/flow',
      },
      {
        full_name: 'prettier/prettier',
      },
      {
        full_name: 'test/flow',
      },
    ],
  })),
}));

describe('Landing page container', () => {
  let wrapper;
  let instance;

  beforeEach(async () => {
    const history = createMemoryHistory('/');
    wrapper = shallow(<LandingPage history={history} />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should have empty list of repositories', async () => {
    expect(wrapper.state('repositories')).toEqual([]);
  });

  it('Should fetch repositories', async () => {
    instance.fetchAdditionalDetails = jest.fn();
    instance.fetchAdditionalDetails.mockResolvedValue({
      isStarred: false,
      contributors_count: 15,
    });
    await instance.fetchRepos('flow');
    expect(wrapper.state('repositories')).toHaveLength(3);
  });
});
