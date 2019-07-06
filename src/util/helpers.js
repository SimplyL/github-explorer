const constructUrl = (apiUrl, search) => {
  const url = new URL(apiUrl.host);
  if (apiUrl.pathname) {
    url.pathname = apiUrl.pathname;
  }
  url.search = search ? `q=${search}${apiUrl.query}` : apiUrl.query;
  return url;
};

export default constructUrl;
