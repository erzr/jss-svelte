require('cross-fetch/polyfill');
const proxy = require('http-proxy-middleware');
var express = require('express');
const config = require('./src/temp/config');

const static = process.argv.some((arg) => arg === '--static');

let renderView = null;
if (static) {
  try {
    renderView = require('./build/server.bundle').renderView;
  } catch {
    console.error('Server bundle does not exist...');
    process.exit(1);
  }
}

var app = express();
var root = __dirname + '/public'

const isDisconnected = /localhost/i.test(config.sitecoreApiHost);

if (isDisconnected) {
  // when disconnected we proxy to the local faux layout service host,
  // see scripts/disconnected-mode-proxy.js
  const proxyUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;
  app.use(proxy('/sitecore', { target: proxyUrl }));
  app.use(proxy('/data/media', { target: proxyUrl }));
} else {
  // when in connected mode we want to proxy Sitecore paths
  // off to Sitecore

  app.use(proxy('/sitecore', { target: config.sitecoreApiHost }));
  // media items
  app.use(proxy('/-', { target: config.sitecoreApiHost }));
  // visitor identification
  app.use(proxy('/layouts', { target: config.sitecoreApiHost }));
}

const requestData = (url) => {
  return fetch(url).then(res => res.json());
}

const getEndpoint = () => {
  return isDisconnected ? `http://localhost:${process.env.PROXY_PORT || 3042}` : config.sitecoreApiHost;
}

const requestLayoutServiceData = (route, language) => {
  const endpoint = getEndpoint();
  const layoutUrl = `${endpoint}/sitecore/api/layout/render/jss?item=${route}&sc_lang=${language}&sc_apikey=${config.sitecoreApiKey}`;
  return requestData(layoutUrl);
};

const requestDictionaryServiceData = (language) => {
  const endpoint = getEndpoint();
  const layoutUrl = `${endpoint}/sitecore/api/jss/dictionary/${config.jssAppName}/${language}?sc_apikey=${config.sitecoreApiKey}`;
  return requestData(layoutUrl);
};

const renderStatic = (path, layoutServiceData, dictionaryData) => {
  return new Promise(resolve => {
    renderView((error, rendered) => {
      resolve(rendered)
    }, path, layoutServiceData, { dictionary: dictionaryData });
  })
};

const nonStaticCallback = (req, res, next) => {
  if (!static) {
    res.sendFile(root + '/index.html')
  } else {
    next();
  }
}

const retrieveStaticData = (req, res, next) => {
  if (static) {
    const language = 'en'; // make this dynamic...
    const path = req.path;

    const promises = [
      requestLayoutServiceData(path, language),
      requestDictionaryServiceData(language)
    ];

    Promise.all(promises).then(([layoutServiceData, dicationaryData]) => {
      req.JSS_DATA = {
        path: path,
        layout: layoutServiceData,
        dictionary: dicationaryData
      };
      next();
    });

  } else {
    next();
  }
}

const staticCallback = (req, res) => {
  const {path, layout, dictionary} = req.JSS_DATA;

  renderStatic(path, layout, dictionary)
    .then(rendered => {
      const {html} = rendered;
      res.set('Content-Type', 'text/html');
      res.send(html);
    });
};

app.get(/^[^\.]*$/, [nonStaticCallback, retrieveStaticData, staticCallback]);

app.use(express.static(root))

app.listen(3000);