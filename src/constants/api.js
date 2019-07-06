const GITHUB_API = 'https://api.github.com';
const GITHUB_SEARCH_REPOSITORY_PATH = 'search/repositories';
const GITHUB_SEARCH_QUERY = '&sort=stars&order=desc';

export default {
  host: GITHUB_API,
  pathname: GITHUB_SEARCH_REPOSITORY_PATH,
  query: GITHUB_SEARCH_QUERY,
};
