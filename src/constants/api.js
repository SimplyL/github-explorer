export const GITHUB_API = 'https://api.github.com';
export const GITHUB_REPOS_PATH = 'repos';
export const GITHUB_STARRING_PATH = 'user/starred';
export const GUTHUB_ACTIVITY_PATH = 'stats/participation';
const GITHUB_SEARCH_REPOSITORY_PATH = 'search/repositories';
const GITHUB_SEARCH_QUERY = '&sort=stars&order=desc';

export default {
  pathname: GITHUB_SEARCH_REPOSITORY_PATH,
  query: GITHUB_SEARCH_QUERY,
};
