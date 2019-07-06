import { getLinkHeaders } from './fetch';

const constructUrl = (apiUrl, search) => {
  const url = new URL(apiUrl.host);
  if (apiUrl.pathname) {
    url.pathname = apiUrl.pathname;
  }
  url.search = search ? `q=${search}${apiUrl.query}` : apiUrl.query;
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
