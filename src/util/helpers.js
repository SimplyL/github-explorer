import { getLinkHeaders } from './fetch';

const constructUrl = ({ host, pathname, query = '' }, search) => {
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

export {
  constructUrl,
  getContributorCount,
};
