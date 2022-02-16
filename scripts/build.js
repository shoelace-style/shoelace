import fs from 'fs';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import del from 'del';
import esbuild from 'esbuild';
import getPort, { portNumbers } from 'get-port';
import { globby } from 'globby';
import { execSync } from 'child_process';
import open from 'open';

const { bundle, copydir, dir, serve, types } = commandLineArgs([
  { name: 'bundle', type: Boolean },
  { name: 'copydir', type: String },
  { name: 'dir', type: String, defaultValue: 'dist' },
  { name: 'serve', type: Boolean },
  { name: 'types', type: Boolean }
]);

const outdir = dir;

del.sync(outdir);
fs.mkdirSync(outdir, { recursive: true });

(async () => {
  try {
    execSync(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-search.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-react.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-vscode-data.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-web-types.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-icons.js --outdir "${outdir}"`, { stdio: 'inherit' });
    if (types) {
      console.log('Running the TypeScript compiler...');
      execSync(`ttsc --project ./tsconfig.prod.json --outdir "${outdir}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }

  const alwaysExternal = ['@lit-labs/react', 'react'];
  const buildResult = await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints: [
        // The whole shebang
        './src/shoelace.ts',
        // Components
        ...(await globby('./src/components/**/!(*.(style|test)).ts')),
        // Translations
        ...(await globby('./src/translations/**/*.ts')),
        // Public utilities
        ...(await globby('./src/utilities/**/!(*.(style|test)).ts')),
        // Theme stylesheets
        ...(await globby('./src/themes/**/!(*.test).ts')),
        // React wrappers
        ...(await globby('./src/react/**/*.ts'))
      ],
      outdir,
      chunkNames: 'chunks/[name].[hash]',
      incremental: serve,
      define: {
        // Popper.js requires this to be set
        'process.env.NODE_ENV': '"production"'
      },
      bundle: true,
      //
      // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
      // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
      //
      // We never bundle React or @lit-labs/react though!
      //
      external: bundle
        ? alwaysExternal
        : [...alwaysExternal, '@popperjs/core', '@shoelace-style/animations', 'lit', 'qr-creator'],
      splitting: true,
      plugins: []
    })
    .catch(err => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  // Copy the build output to an additional directory
  if (copydir) {
    del.sync(copydir);
    copy(outdir, copydir);
  }

  console.log(chalk.green(`The build has been generated at ${outdir} 📦\n`));

  // Dev server
  if (serve) {
    const bs = browserSync.create();
    const port = await getPort({
      port: portNumbers(4000, 4999)
    });

    // Make sure docs/dist is empty since we're serving it virtually
    del.sync('docs/dist');

    const browserSyncConfig = {
      open: false,
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
      },
      socket: {
        socketIoClientConfig: {
          // Configure socketIO to retry forever when disconnected to enable the auto-reattach timeout below to work
          reconnectionAttempts: Infinity,
          reconnectionDelay: 500,
          reconnectionDelayMax: 500,
          timeout: 1000
        }
      }
    };

    // Launch browser sync
    bs.init(browserSyncConfig, () => {
      // This init callback gets executed after the server has started
      const socketIoConfig = browserSyncConfig.socket.socketIoClientConfig;

      // Wait enough time for any open, detached clients to have a chance to reconnect. This will be used to determine
      // if we reload an existing tab or open a new one.
      const tabReattachDelay = socketIoConfig.reconnectionDelayMax * 2 + socketIoConfig.timeout;

      setTimeout(() => {
        const url = `http://localhost:${port}`;
        console.log(chalk.cyan(`Launched the Shoelace dev server at ${url} 🥾\n`));
        if (Object.keys(bs.sockets.sockets).length === 0) {
          open(url);
        } else {
          bs.reload();
        }
      }, tabReattachDelay);
    });

    // Rebuild and reload when source files change
    bs.watch(['src/**/!(*.test).*']).on('change', async filename => {
      console.log(`Source file changed - ${filename}`);
      buildResult
        // Rebuild and reload
        .rebuild()
        .then(() => {
          // Rebuild stylesheets when a theme file changes
          if (/^src\/themes/.test(filename)) {
            execSync(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
          }
        })
        .then(() => {
          // Skip metadata when styles are changed
          if (/(\.css|\.styles\.ts)$/.test(filename)) {
            return;
          }

          execSync(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
        })
        .then(() => {
          bs.reload();
        })
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
