import Index from './Index.svelte';
const packageConfig = require('../../package.json');
const fs = require('fs');

const renderedIndex = Index.render({ distPath: packageConfig.config.sitecoreDistPath })

const { html } = renderedIndex;

fs.writeFileSync('public/index.html', html);