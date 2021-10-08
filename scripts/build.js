//
// Builds the project. To spin up a dev server, pass the --serve flag.
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import del from 'del';
import esbuild from 'esbuild';
import getPort from 'get-port';
import glob from 'globby';
import { execSync } from 'child_process';
import { startDevServer } from '@web/dev-server';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import chokidar from "chokidar";

const { dev } = commandLineArgs({ name: 'dev', type: Boolean });

del.sync('./dist');

try {
  if (!dev) execSync('tsc', { stdio: 'inherit' }); // for type declarations
  execSync('node scripts/make-metadata.js', { stdio: 'inherit' });
  execSync('node scripts/make-search.js', { stdio: 'inherit' });
  execSync('node scripts/make-vscode-data.js', { stdio: 'inherit' });
  execSync('node scripts/make-css.js', { stdio: 'inherit' });
  execSync('node scripts/make-icons.js', { stdio: 'inherit' });
} catch (err) {
  console.error(chalk.red(err));
  process.exit(1);
}

(async () => {
  const entryPoints = [
    // The whole shebang dist
    './src/shoelace.ts',
    // Components
    ...(await glob('./src/components/**/!(*.(style|test)).ts')),
    // Public utilities
    ...(await glob('./src/utilities/**/!(*.(style|test)).ts')),
    // Theme stylesheets
    ...(await glob('./src/themes/**/!(*.test).ts'))
  ];

  const buildResult = await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints,
      outdir: './dist',
      chunkNames: 'chunks/[name].[hash]',
      incremental: dev,
      define: {
        // Popper.js expects this to be set
        'process.env.NODE_ENV': '"production"'
      },
      bundle: true,
      splitting: true,
      plugins: []
    })
    .catch(err => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  // Always copy since Web Dev Server doesnt use virtual in memory files.
  await del("./docs/dist")
  await Promise.all([copy('./dist', './docs/dist')]);

  console.log(chalk.green('The build has finished! 📦\n'));

  if (dev) {
    const port = await getPort({
      port: getPort.makeRange(4000, 4999)
    });

    console.log(chalk.cyan(`Launching the Shoelace dev server at http://localhost:${port}! 🥾\n`));

    const { webSockets, server } = await startDevServer({
      config: {
        port: port,
        rootDir: "./docs",
        watch: true,
        nodeResolve: true,
        open: true,
        appIndex: "docs/index.html",
        plugins: [esbuildPlugin({ ts: true, target: 'auto' })]
      },
      readCliArgs: true,
      readFileConfig: true,
    });

    // Rebuild and reload when source files change
    chokidar.watch(['src/**/!(*.test).*']).on('change', async filename => {
      console.log(`[WDS]: Source file changed - ${filename}`);
      await del('./docs/dist');
      buildResult
        // Rebuild and reload
        .rebuild()
        .then(() => {
          // Rebuild stylesheets when a theme file changes
          if (/^src\/themes/.test(filename)) {
            execSync('node scripts/make-css.js', { stdio: 'inherit' });
          }
        })
        .then(() => {
          // Skip metadata when styles are changed
          if (/(\.css|\.styles\.ts)$/.test(filename)) {
            return;
          }

          execSync('node scripts/make-metadata.js', { stdio: 'inherit' });
        })
        .then(async () => {
          await Promise.all([copy('./dist', './docs/dist')]);
          webSockets.send(`data:text/javascript,window.location.reload();`)
        })
        .catch(err => console.error(chalk.red(err)));
    });

    // Reload without rebuilding when the docs change
    chokidar.watch(['docs/**/*.md']).on('change', filename => {
      console.log(`[WDS]: Docs file changed - ${filename}`);
      execSync('node scripts/make-search.js', { stdio: 'inherit' });
      webSockets.send(`data:text/javascript,window.location.reload();`)
    });

    // Cleanup on exit
    process.on('SIGTERM', async () => {
      buildResult.rebuild.dispose()
      await server.stop()
    });
  }
})();
