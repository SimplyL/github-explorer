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

const handleFetch = async (url, options = {}) => fetch(url, {
  ...options,
}).then(handleBadResponses)
  .then(handleJson);

export const get = async (url, options = {}) => handleFetch(url, {
  ...options,
  method: 'GET',
});

export const post = async (url, body, options = {}) => handleFetch(url, {
  ...formatOptions(options, body),
  method: 'POST',
});
