import {
  constructUrl,
  getContributorCount,
  getStargazerStatus,
} from '../helpers';

jest.mock('../fetch', () => ({
  getLinkHeaders: jest.fn().mockImplementation(() => Promise.resolve({ last: { page: 12 } })),
  get: jest.fn().mockImplementation(() => Promise.resolve(404)),
}));

describe('Helper functions', () => {
  it('Should contruct correct url', () => {
    const url = constructUrl({ pathname: '/test' }, 'search');
    expect(url.href).toBe('https://api.github.com/test?q=search');
  });

  it('Should return correct contributor count', async () => {
    const contributorCount = await getContributorCount('https://test/url');
    expect(contributorCount).toBe(12);
  });

  it('Should check if user has starred a repository', async () => {
    const hasStarred = await getStargazerStatus({ owner: 'test', repo: 'test' });
    expect(hasStarred).toBe(false);
  });
});
