const constructUrl = (apiUrl, query) => {
  const url = new URL(apiUrl.host);
  url.pathname = apiUrl.pathname;
  url.search = `q=${query}${apiUrl.search}`;
  return url;
};

export default constructUrl;
