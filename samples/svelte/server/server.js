import 'cross-fetch/polyfill';
import App from '../src/App.svelte';
import serializeJavascript from 'serialize-javascript';
import indexTemplate from '../build/index.html';
import config from '../src/temp/config';
import i18nInit from "../src/i18n";
import GraphQLWrapper from '../src/GraphQLWrapper';

function assertReplace(string, value, replacement) {
  let success = false;
  const result = string.replace(value, () => {
    success = true;
    return replacement;
  });

  if (!success) {
    throw new Error(
      `Unable to match replace token '${value}' in public/index.html template. If the HTML shell for the app is modified, also fix the replaces in server.js. Server-side rendering has failed!`
    );
  }

  return result;
}

function getIndexHtml() {
  let { html } = indexTemplate.render();
  return html;
}

export function renderView(callback, path, data, viewBag) {
  const state = parseServerData(data, viewBag);

  const graphQLClient = new GraphQLWrapper(config.graphQLEndpoint, true);

  initializei18n(state).then(dictionary => {
    let renderedApp = App.render({ path: path, routeData: state, graphQLClient, dictionary });

    let queryPromise = null;

    if (graphQLClient.needsToWait()) {
      queryPromise = graphQLClient.waitForPromises()
        .then(() => {
          graphQLClient.cacheOnly = true;
          renderedApp = App.render({ path: path, routeData: state, graphQLClient, dictionary });
        })
    } else {
      queryPromise = Promise.resolve();
    }

    queryPromise.then(() => {
      const { html, head } = renderedApp;

      let indexHtml = getIndexHtml();

      // write the React app
      indexHtml = assertReplace(
        indexHtml,
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      indexHtml = assertReplace(
        indexHtml,
        '</head>',
        `${head}</head>`
      );

      // write the string version of our state
      indexHtml = assertReplace(
        indexHtml,
        '<script type="application/json" id="__JSS_STATE__">null',
        `<script type="application/json" id="__JSS_STATE__">${serializeJavascript(state, {
          isJSON: true,
        })}`
      );

      callback(null, { html: indexHtml });
    });

  });

};

function parseServerData(data, viewBag) {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}

function initializei18n(state) {
  // don't init i18n for not found routes
  if (!state || !state.sitecore || !state.sitecore.context) return Promise.resolve();

  return i18nInit(state.sitecore.context.language, state.viewBag.dictionary || {});
}