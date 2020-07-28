import 'cross-fetch/polyfill';
import type {HttpResponse, LayoutServiceData} from "@sitecore-jss/sitecore-jss";
/**
 * Implements a data fetcher using fetch - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export default function dataFetcher(url: string, data?: {
    [key: string]: any;
}): Promise<HttpResponse<LayoutServiceData>> {
  return fetch(url, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    body: JSON.stringify(data)
  })
  .then(response => {
    return response.json().then(json => ({
      status: response.status,
      statusText: response.statusText,
      data: json as LayoutServiceData
    }));
  });
}