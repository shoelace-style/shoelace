//
// Builds the project. To spin up a dev server, pass the --serve flag.
//
const bs = require('browser-sync').create();
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');
const copy = require('recursive-copy');
const del = require('del');
const esbuild = require('esbuild');
const execSync = require('child_process').execSync;
const getPort = require('get-port');
const glob = require('tiny-glob');
const inlineImportPlugin = require('esbuild-plugin-inline-import');
const path = require('path');
const sass = require('sass');
const sassPlugin = require('esbuild-plugin-sass');
const { build } = require('esbuild');

const { dev } = commandLineArgs({ name: 'dev', type: Boolean });

del.sync('./dist');

if (!dev) execSync('tsc', { stdio: 'inherit' }); // for type declarations
execSync('node scripts/make-metadata.cjs', { stdio: 'inherit' });
execSync('node scripts/make-icons.cjs', { stdio: 'inherit' });

(async () => {
  const entryPoints = [
    // The whole shebang dist
    './src/shoelace.ts',
    // Components
    ...(await glob('./src/components/**/*.ts')),
    // Public utilities
    ...(await glob('./src/utilities/**/*.ts')),
    // Theme stylesheets
    ...(await glob('./src/themes/**/*.ts'))
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
      plugins: [
        // Run inline style imports through Sass
        inlineImportPlugin({
          filter: /^sass:/,
          transform: async (contents, args) => {
            return await new Promise((resolve, reject) => {
              sass.render(
                {
                  data: contents,
                  includePaths: [path.dirname(args.path)]
                },
                (err, result) => {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve(result.css.toString());
                }
              );
            });
          }
        }),
        // Run all other stylesheets through Sass
        sassPlugin()
      ]
    })
    .catch(err => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  // Create the docs distribution by copying dist into docs/dist. This is what powers the website. It can't exist in dev
  // because it will conflict with browser sync's routing to the actual dist dir.
  await del('./docs/dist');
  if (!dev) {
    await copy('./dist', './docs/dist');
  }

  console.log(chalk.green('The build has finished! 📦'));

  if (dev) {
    const port = await getPort({
      port: getPort.makeRange(4000, 4999)
    });

    console.log(chalk.cyan(`\nLaunching the Shoelace dev server at http://localhost:${port}! 🥾\n`));

    // Launch browser sync
    bs.init({
      startPath: '/',
      port,
      logLevel: 'silent',
      logPrefix: '[shoelace]',
      logFileChanges: true,
      notify: false,
      server: {
        baseDir: 'docs',
        routes: {
          '/dist': './dist'
        }
      }
    });

    // Rebuild and reload when source files change
    bs.watch(['src/**/*']).on('change', async filename => {
      console.log(`Source file changed - ${filename}`);

      // NOTE: we don't run TypeDoc on every change because it's quite heavy, so changes to the docs won't be included
      // until the next time the build script runs.
      buildResult
        .rebuild()
        .then(() => bs.reload())
        .catch(err => console.error(chalk.red(err)));
    });

    // Reload without rebuilding when the docs change
    bs.watch(['docs/**/*']).on('change', filename => {
      console.log(`Docs file changed - ${filename}`);
      bs.reload();
    });

    // Cleanup on exit
    process.on('SIGTERM', () => buildResult.rebuild.dispose());
  }
})();
