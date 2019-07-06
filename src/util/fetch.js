import status from 'http-status';

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

const formatOptions = (options, body) => ({
  ...options,
  headers: {
    ...options.headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const handleAuthorizedFetch = async (url, options = {}) => {
  const headers = {
    ...options.headers,
  };
  headers.Authorization = `token ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`;

  return fetch(url, {
    ...options,
    headers,
  }).then(handleBadResponses)
    .then(handleJson);
};

export const get = async (url, options = {}) => handleAuthorizedFetch(url, {
  ...options,
  method: 'GET',
});

export const post = async (url, body, options = {}) => handleAuthorizedFetch(url, {
  ...formatOptions(options, body),
  method: 'POST',
});
