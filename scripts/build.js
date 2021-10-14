import browserSync from 'browser-sync';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import del from 'del';
import esbuild from 'esbuild';
import fs from 'fs';
import getPort from 'get-port';
import glob from 'globby';
import mkdirp from 'mkdirp';
import path from 'path';
import { URL } from 'url';
import { execSync } from 'child_process';

const build = esbuild.build;
const bs = browserSync.create();

const { bundle, dir, serve, types } = commandLineArgs([
  { name: 'dir', type: String, defaultValue: 'dist' },
  { name: 'serve', type: Boolean },
  { name: 'bundle', type: Boolean },
  { name: 'types', type: Boolean }
]);

const __dirname = new URL('.', import.meta.url).pathname;
const rootDir = path.dirname(__dirname);
const outdir = path.relative(rootDir, dir);

del.sync(outdir);
mkdirp.sync(outdir);

(async () => {
  try {
    if (types) execSync(`tsc --project . --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-search.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-vscode-data.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-css.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-icons.js --outdir "${outdir}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }

  const buildResult = await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints: [
        // The whole shebang
        './src/shoelace.ts',
        // Components
        ...(await glob('./src/components/**/!(*.(style|test)).ts')),
        // Public utilities
        ...(await glob('./src/utilities/**/!(*.(style|test)).ts')),
        // Theme stylesheets
        ...(await glob('./src/themes/**/!(*.test).ts'))
      ],
      outdir,
      chunkNames: 'chunks/[name].[hash]',
      incremental: serve,
      define: {
        // Popper.js expects this to be set
        'process.env.NODE_ENV': '"production"'
      },
      bundle: true,
      //
      // We don't bundle certain dependencies in the production build. This ensures the dist ships with bare module
      // specifiers, allowing end users to optimize better. jsDelivr understands this if you add /+esm to the URL. Note
      // that we can't bundle packages that don't ship ESM. https://github.com/jsdelivr/jsdelivr/issues/18263
      //
      // We still bundle for the dev environment and the docs build since we don't use a CDN for those. Once import maps
      // are better supported, we can adjust for that and use the same build again. https://caniuse.com/import-maps
      //
      external: bundle ? undefined : ['@popperjs/core', '@shoelace-style/animations', 'lit', 'qr-creator'],
      splitting: true,
      plugins: []
    })
    .catch(err => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  console.log(chalk.green(`The build has been generated at ${outdir} 📦\n`));

  // Dev server
  if (serve) {
    const port = await getPort({
      port: getPort.makeRange(4000, 4999)
    });

    console.log(chalk.cyan(`Launching the Shoelace dev server at http://localhost:${port}! 🥾\n`));

    // Launch browser sync
    bs.init({
      startPath: '/',
      port,
      logLevel: 'silent',
      logPrefix: '[shoelace]',
      logFileChanges: true,
      notify: false,
      single: true,
      ghostMode: false,
      server: {
        baseDir: 'docs',
        routes: {
          '/dist': './dist'
        }
      }
    });

    // Rebuild and reload when source files change
    bs.watch(['src/**/!(*.test).*']).on('change', async filename => {
      console.log(`Source file changed - ${filename}`);
      buildResult
        // Rebuild and reload
        .rebuild()
        .then(async () => {
          // Rebuild stylesheets when a theme file changes
          if (/^src\/themes/.test(filename)) {
            execSync(`node scripts/make-css.js --outdir "${outdir}"`, { stdio: 'inherit' });
          }
        })
        .then(() => {
          // Skip metadata when styles are changed
          if (/(\.css|\.styles\.ts)$/.test(filename)) {
            return;
          }

          execSync(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
        })
        .then(() => bs.reload())
        .catch(err => console.error(chalk.red(err)));
    });

    // Reload without rebuilding when the docs change
    bs.watch(['docs/**/*.md']).on('change', filename => {
      console.log(`Docs file changed - ${filename}`);
      execSync(`node scripts/make-search.js --outdir "${outdir}"`, { stdio: 'inherit' });
      bs.reload();
    });
  }

  // Cleanup on exit
  process.on('SIGTERM', () => buildResult.rebuild.dispose());
})();
