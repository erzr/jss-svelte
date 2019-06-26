const proxy = require('http-proxy-middleware');
var fallback = require('express-history-api-fallback')
var express = require('express');
const config = require('./src/temp/config');

var app = express()
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

app.use(express.static(root))
app.use(fallback('index.html', { root: root }))
app.listen(3000);