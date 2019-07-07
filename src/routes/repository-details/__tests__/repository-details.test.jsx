import React from 'react';
import { shallow } from 'enzyme';
import RepositoryDetails from '../index';
import {
  match,
  repository,
  activityData,
  effectiveHours,
  totalHours,
} from './__mocks__/mocks';

jest.mock('../../../util/helpers', () => ({
  getStargazerStatus: jest.fn().mockImplementation(() => Promise.resolve(false)),
  getContributorCount: jest.fn().mockImplementation(() => Promise.resolve(759)),
  constructUrl: jest.fn(),
}));

describe('Repository details container', () => {
  let wrapper;
  let instance;

  beforeEach(async () => {
    wrapper = shallow(<RepositoryDetails match={match} />);
    instance = wrapper.instance();
    instance.getRepository = jest.fn();
    instance.getActivityData = jest.fn();
    instance.getRepository.mockResolvedValue(repository);
    instance.getActivityData.mockResolvedValue(activityData);
    await instance.componentDidMount();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should add a star', async () => {
    instance.starRepository = jest.fn();
    instance.starRepository.mockResolvedValue(true);
    await instance.handleClick();
    expect(instance.starRepository).toHaveBeenCalled();
    expect(wrapper.state('repository').isStarred).toBe(true);
  });

  it('Should remove a star', async () => {
    wrapper.setState({
      repository: {
        ...wrapper.state('repository'),
        isStarred: true,
      },
    });
    instance.unstarRepository = jest.fn();
    instance.unstarRepository.mockResolvedValue(false);
    await instance.handleClick();
    expect(instance.unstarRepository).toHaveBeenCalled();
    expect(wrapper.state('repository').isStarred).toBe(false);
  });

  it('Should calculate effective hours', () => {
    expect(wrapper.instance().calculateEffectiveHours(10, 5, activityData.all))
      .toEqual(effectiveHours);
  });

  it('Should calculate total hours', () => {
    expect(wrapper.instance().calculateTotalHours(effectiveHours)).toEqual(totalHours);
  });
});
