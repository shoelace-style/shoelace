//
// The Shoelace dev server! 🥾
//
// This is an Express + Browsersync script that:
//
//  - Proxies Stencil's dev server (for HMR of components)
//  - Serves dist/ and docs/ from https://localhost:3000/
//  - Launches the docs site and reloads the page when pages are modified
//
// Usage:
//
//   1. Run Stencil: `stencil build --dev --docs --watch --serve --no-open`
//
//   2. Run this script at the same time as Stencil
//

const bs = require('browser-sync').create();
const chalk = require('chalk');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const browserPort = 4000;
const stencilPort = 4001;
const proxyPort = 4002;

// Proxy Stencil's dev server
app.use(
  '/~dev-server',
  createProxyMiddleware({
    target: `http://localhost:${stencilPort}`,
    changeOrigin: true,
    ws: true
  })
);

// Inject Stencil's dev server iframe into the main entry point
app.use(/^\/$/, async (req, res, next) => {
  let index = await fs.readFile('./docs/index.html', 'utf8');
  index = index
    .replace('<head>', '<head><script>window.ShoelaceDevServer = true;</script>')
    .replace(
      '</body>',
      '<iframe src="/~dev-server" style="display: block; width: 0; height: 0; border: 0;"></iframe></body>'
    );
  res.type('html').send(index);
});
app.use('/dist', express.static('./dist'));
app.use('/themes', express.static('./themes'));
app.use('/', express.static('./docs'));
app.listen(proxyPort);

// Give Stencil's dev server a few seconds to spin up, then launch the browser
setTimeout(() => {
  console.log(chalk.cyan(`\nLaunching the Shoelace dev server at http://localhost:${browserPort}! 🥾\n`));

  bs.init({
    startPath: '/',
    port: browserPort,
    proxy: {
      target: `http://localhost:${proxyPort}`,
      ws: true
    },
    logLevel: 'silent',
    notify: false,
    snippetOptions: {
      ignorePaths: '/~dev-server'
    }
  });

  // Reload when docs or themes change
  bs.watch('./{docs,themes}/**/*').on('change', async () => {
    bs.reload();
  });
}, 5000);
