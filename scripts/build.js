import browserSync from 'browser-sync';
import chalk from 'chalk';
import { execSync } from 'child_process';
import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import esbuild from 'esbuild';
import fs from 'fs';
import * as path from 'path';
import getPort, { portNumbers } from 'get-port';
import { globby } from 'globby';
import copy from 'recursive-copy';

const { bundle, copydir, dir, serve, types } = commandLineArgs([
  { name: 'bundle', type: Boolean },
  { name: 'copydir', type: String },
  { name: 'dir', type: String, defaultValue: 'dist' },
  { name: 'serve', type: Boolean },
  { name: 'types', type: Boolean }
]);

const outdir = dir;
const cdnDir = 'cdn';

const outputDirectories = [
  cdnDir,
  outdir
]

outputDirectories.forEach((dir) => {
  deleteSync(dir)
  fs.mkdirSync(dir, { recursive: true });
})

(async () => {
  try {
    outputDirectories.forEach((dir) => {
      execSync(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
      execSync(`node scripts/make-search.js --outdir "${dir}"`, { stdio: 'inherit' });
      execSync(`node scripts/make-react.js --outdir "${dir}"`, { stdio: 'inherit' });
      execSync(`node scripts/make-web-types.js --outdir "${dir}"`, { stdio: 'inherit' });
      execSync(`node scripts/make-themes.js --outdir "${dir}"`, { stdio: 'inherit' });
      execSync(`node scripts/make-icons.js --outdir "${dir}"`, { stdio: 'inherit' });

      if (types) {
        console.log('Running the TypeScript compiler...');
        execSync(`tsc --project ./tsconfig.prod.json --outdir "${dir}"`, { stdio: 'inherit' });
      }
    })
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }

  const alwaysExternal = ['@lit-labs/react', 'react'];
  const bundledConfig = {
    format: 'esm',
    target: 'es2017',
    entryPoints: [
      //
      // NOTE: Entry points must be mapped in package.json > exports, otherwise users won't be able to import them!
      //
      // The whole shebang
      './src/shoelace.ts',
      // The auto-loader
      './src/shoelace-autoloader.ts',
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
    chunkNames: 'chunks/[name].[hash]',
    incremental: serve,
    define: {
      // Floating UI requires this to be set
      'process.env.NODE_ENV': '"production"'
    },
    bundle: true,
    outdir: cdnDir,
    //
    // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
    // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
    //
    // We never bundle React or @lit-labs/react though!
    //
    external: bundle
      ? alwaysExternal
      : [...alwaysExternal, '@floating-ui/dom', '@shoelace-style/animations', 'lit', 'qr-creator'],
    splitting: true,
    plugins: []
  };

  const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
  const unbundledConfig = {
    ...bundledConfig,
    // Goes to /dist/npm
    outdir,
    target: 'esnext',
    external: [...Object.keys(packageJSON.dependencies || {}), ...Object.keys(packageJSON.peerDependencies || {})]
  };

  const unbundledResult = await esbuild.build(unbundledConfig).catch(err => {
    console.error(chalk.red(err));
    console.error(chalk.red('\nFailed to build NPM (unbundled) build'));
    process.exit(1);
  });
  const bundledResult = await esbuild.build(bundledConfig).catch(err => {
    console.error(chalk.red(err));
    console.error(chalk.red('\nFailed to build CDN (bundled) build'));
    process.exit(1);
  });

  // Copy the build output to an additional directory
  if (copydir) {
    deleteSync(copydir);
    copy(cdnDir, copydir);
  }

  console.log(chalk.green(`The build has been generated to: ${outputDirectories.join(", ")} 📦\n`));

  // Dev server
  if (serve) {
    const bs = browserSync.create();
    const port = await getPort({
      port: portNumbers(4000, 4999)
    });

    // Make sure docs/dist is empty since we're serving it virtually
    deleteSync('docs/dist');

    const browserSyncConfig = {
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
          '/dist': './cdn'
        }
      },
      //
      // Suppress Chrome's document.write() warning
      //
      // More info: https://github.com/BrowserSync/browser-sync/issues/1600)
      //
      snippetOptions: {
        rule: {
          match: /<\/head>/u,
          fn: (snippet, match) => {
            const {
              groups: { src }
            } = /src='(?<src>[^']+)'/u.exec(snippet);
            return `<script src="${src}" async></script>${match}`;
          }
        }
      }
    };

    // Launch browser sync
    bs.init(browserSyncConfig, () => {
      const url = `http://localhost:${port}`;
      console.log(chalk.cyan(`Launched the Shoelace dev server at ${url} 🥾\n`));
    });

    // Rebuild and reload when source files change
    bs.watch(['src/**/!(*.test).*']).on('change', async filename => {
      console.log(`Source file changed - ${filename}`);
      [bundledResult, unbundledResult].forEach(build => {
        // Rebuild and reload
        build
          .rebuild()
          .then(() => {
            // Rebuild stylesheets when a theme file changes
            if (/^src\/themes/.test(filename)) {
              outputDirectories.forEach((dir) => {
                execSync(`node scripts/make-themes.js --outdir "${dir}"`, { stdio: 'inherit' });
              })
            }
          })
          .then(() => {
            // Skip metadata when styles are changed
            if (/(\.css|\.styles\.ts)$/.test(filename)) {
              return;
            }

            outputDirectories.forEach((dir) => {
              execSync(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
            })
          })
          .then(() => {
            bs.reload();
          })
          .catch(err => console.error(chalk.red(err)));
      });
    });

    // Reload without rebuilding when the docs change
    bs.watch(['docs/**/*.md']).on('change', filename => {
      console.log(`Docs file changed - ${filename}`);

      outputDirectories.forEach((dir) => {
        execSync(`node scripts/make-search.js --outdir "${dir}"`, { stdio: 'inherit' });
      })
      bs.reload();
    });
  }

  // Cleanup on exit
  process.on('SIGTERM', () => {
    bundledResult.rebuild.dispose();
    unbundledResult.rebuild.dispose();
  });
})();
