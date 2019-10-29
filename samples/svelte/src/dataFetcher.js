import 'cross-fetch/polyfill';

/**
 * Implements a data fetcher using fetch - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export function dataFetcher(url, data) {
  return fetch(url, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    body: JSON.stringify(data)
  }).then(response => ({
    status: response.status,
    statusText: response.statusText,
    data: response.json()
  }));
}