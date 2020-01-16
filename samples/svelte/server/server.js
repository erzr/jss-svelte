import App from '../src/App.svelte';
import Index from '../src/Index.svelte';
import serializeJavascript from 'serialize-javascript';
import config from '../src/temp/config';
import i18nInit from "../src/i18n";
import GraphQLWrapper from '../src/GraphQLWrapper';

export const serverConfig = config;

export function renderIndex(headHtml, appHtml, state, cache) {
  const serializedState = serializeJavascript(state, { isJSON: true, });
  const cacheState = serializeJavascript(cache, { isJSON: true, });
  const { html } = Index.render({ headHtml, appHtml, serializedState, cacheState });
  return html;
}

export function buildGraphQLClient(fetch = null) {
  return new GraphQLWrapper(config.graphQLEndpoint, true, fetch);
}

export function performRenderApp(path, state, graphQLClient, dictionary) {
  const rendered = App.render({ path: path, routeData: state, graphQLClient, dictionary });
  return rendered;
}

export function parseServerData(data, viewBag) {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}

export function renderApp(path, state, graphQLClient) {
  return new Promise(resolve => {
    initializei18n(state).then(dictionary => {
      const firstRender = performRenderApp(path, state, graphQLClient, dictionary);

      if (!graphQLClient.needsToWait()) {
        resolve(firstRender);
      } else {
        graphQLClient.waitForPromises()
          .then(() => {
            graphQLClient.cacheOnly = true;
            const secondRender = performRenderApp(path, state, graphQLClient, dictionary);
            resolve(secondRender);
          })
      }
    })
  });
}

export function injectRenderedApp(renderedApp, state, cache) {
  const { html, head } = renderedApp;
  let indexHtml = renderIndex(head, html, state, cache);
  return indexHtml;
}

export function initializei18n(state) {
  // don't init i18n for not found routes
  if (!state || !state.sitecore || !state.sitecore.context) return Promise.resolve();

  return i18nInit(state.sitecore.context.language, state.viewBag.dictionary || {});
}

export function renderPage(path, data, viewBag) {
  const state = parseServerData(data, viewBag);

  const graphQLClient = buildGraphQLClient();

  return renderApp(path, state, graphQLClient).then(renderedApp => {
    const cache = graphQLClient.getCache();
    const indexHtml = injectRenderedApp(renderedApp, state, cache);
    return indexHtml;
  })
}

export function renderView(callback, path, data, viewBag) {
  try {
    renderPage(path, data, viewBag)
      .then(indexHtml => {
        callback(null, { html: indexHtml });
      })
      .catch((error) => callback(error, null));
  } catch (err) {
    callback(err, null);
  }
};