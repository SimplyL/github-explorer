import status from 'http-status';
import parse from 'parse-link-header';

const handleBadResponses = async (response) => {
  if (!response.ok) {
    const error = new Error();
    error.status = response.status;

    try {
      error.body = await response.json();
    } catch (err) {
      error.body = err;
    }

    throw error;
  } else {
    return response;
  }
};

const handleJson = async (response) => {
  const shouldHaveBody = response.status === status.OK || response.status === status.CREATED;
  return shouldHaveBody ? response.json() : response;
};

const handleNotFound = (error) => {
  if (error.status === status.NOT_FOUND) {
    return error.status;
  }
  throw error;
};

const formatOptions = (options, body) => ({
  ...options,
  headers: {
    ...options.headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const getAuthHeaders = (options) => {
  const headers = {
    ...options.headers,
  };
  headers.Authorization = `token ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`;
  return headers;
};

const handleAuthorizedFetch = async (url, options = {}) => fetch(url, {
  ...options,
  headers: getAuthHeaders(options),
}).then(handleBadResponses)
  .then(handleJson)
  .catch(handleNotFound);

export const get = async (url, options = {}) => handleAuthorizedFetch(url, {
  ...options,
  method: 'GET',
});

export const post = async (url, body, options = {}) => handleAuthorizedFetch(url, {
  ...formatOptions(options, body),
  method: 'POST',
});

export const put = async (url, options = {}, body) => handleAuthorizedFetch(url, {
  ...formatOptions(options, body),
  method: 'PUT',
});

export const del = async (url, options = {}, body) => handleAuthorizedFetch(url, {
  ...formatOptions(options, body),
  method: 'DELETE',
});

export const getLinkHeaders = async (url, options = {}) => fetch(url, {
  ...options,
  method: 'HEAD',
  headers: getAuthHeaders(options),
}).then(res => parse(res.headers.get('Link')));
