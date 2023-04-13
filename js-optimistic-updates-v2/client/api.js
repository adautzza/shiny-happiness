import debounce from 'lodash/debounce';

export const debouncedFetch = debounce(async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}, 500); // Wait for 500 milliseconds before making the API request
