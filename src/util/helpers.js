import { GITHUB_API, GITHUB_STARRING_PATH } from '../constants/api';
import { getLinkHeaders, get } from './fetch';

const constructUrl = ({ host = GITHUB_API, pathname, query = '' }, search) => {
  const url = new URL(host);
  if (pathname) {
    url.pathname = pathname;
  }
  url.search = search ? `q=${search}${query}` : query;
  return url;
};

const getContributorCount = async (url) => {
  const fullUrl = constructUrl({
    host: url,
    query: 'anon=1&per_page=1',
  });
  const result = await getLinkHeaders(fullUrl);
  return result ? result.last.page : 1;
};

const getStargazerStatus = async (params) => {
  const url = constructUrl({
    pathname: `${GITHUB_STARRING_PATH}/${params.owner}/${params.repo}`,
  });
  const result = await get(url);
  return result !== 404;
};

export {
  constructUrl,
  getContributorCount,
  getStargazerStatus,
};
