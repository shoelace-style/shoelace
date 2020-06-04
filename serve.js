//
// Launches an Express app that:
//
//  - Proxies Stencil's dev server (for HMR)
//  - Serves dist/ and docs/ from https://localhost:3000/
//  - Launches the Docsify site that reloads when the docs are modified
//
// Usage:
//
//   1. Launch Stencil: `stencil build --dev --docs --watch --serve --no-open`
//
//   2. Launch this script.
//
// Result:
//
//  - Changes to components will hot reload
//  - Changes to docs will refresh
//

const bs = require('browser-sync').create();
const chalk = require('chalk');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const proxyPort = 3000;
const browserPort = 4000;

// Proxy Stencil's dev server
app.use(
  '/~dev-server',
  createProxyMiddleware({
    target: 'http://localhost:3333',
    changeOrigin: true,
    ws: true
  })
);

// Inject the dev server iframe into index.html
app.use(/^\/(index.html)?$/, async (req, res, next) => {
  let index = await fs.readFile('./docs/index.html', 'utf8');
  index = index.replace(
    '</body>',
    `
      <iframe src="/~dev-server" style="display: block; width: 0; height: 0; border: 0;"></iframe>
      </body>
    `
  );
  res.type('html').send(index);
});

app.use('/dist', express.static('./dist'));
app.use('/', express.static('./docs'));
app.listen(proxyPort);

// Give the dev server a few seconds to spin up, then launch the browser
setTimeout(() => {
  console.log(chalk.cyan(`\nLaunching the Shoelace dev server at http://localhost:${browserPort}! 👟\n`));

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

  // Reload when docs change
  bs.watch('docs/**/*').on('change', async () => {
    bs.reload();
  });
}, 5000);
