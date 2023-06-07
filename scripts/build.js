import { deleteAsync } from 'del';
import { exec, spawn } from 'child_process';
import { globby } from 'globby';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import chokidar from 'chokidar';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import ora from 'ora';
import util from 'util';

const execPromise = util.promisify(exec);
const { bundle, copydir, dir, serve, types } = commandLineArgs([
  { name: 'bundle', type: Boolean },
  { name: 'copydir', type: String },
  { name: 'serve', type: Boolean },
  { name: 'types', type: Boolean }
]);
const outdir = 'dist';
const sitedir = '_site';
const spinner = ora({ hideCursor: false }).start();
let childProcess;
let buildResult;

//
// Runs 11ty and builds the docs. The returned promise resolves after the initial publish has completed. The child
// process and an array of strings containing any output are included in the resolved promise.
//
async function buildTheDocs(watch = false) {
  return new Promise((resolve, reject) => {
    const args = ['@11ty/eleventy', '--quiet'];
    const watcher = chokidar.watch(sitedir, { persistent: true });
    const output = [];

    if (watch) {
      args.push('--watch');
      args.push('--incremental');
    }

    const child = spawn('npx', args, {
      stdio: 'pipe',
      cwd: 'docs',
      shell: true // for Windows
    });

    child.stdout.on('data', data => {
      output.push(data.toString());
    });

    // Spin up Eleventy and wait for the search index to appear before proceeding. The search index is generated during
    // eleventy.after, so it appears only after the docs are fully published. This is a hacky way to detect when the
    // initial publish is complete, but here we are.
    watcher.on('add', async filename => {
      if (filename.endsWith('search.json')) {
        await watcher.close();

        resolve({ child, output });
      }
    });
  });
}

//
// Builds the source with esbuild.
//
async function buildTheSource() {
  const alwaysExternal = ['@lit-labs/react', 'react'];

  return await esbuild.build({
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
    outdir,
    chunkNames: 'chunks/[name].[hash]',
    incremental: serve,
    define: {
      // Floating UI requires this to be set
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
      : [...alwaysExternal, '@floating-ui/dom', '@shoelace-style/animations', 'lit', 'qr-creator'],
    splitting: true,
    plugins: []
  });
}

//
// Called on SIGINT or SIGTERM to cleanup the build and child processes.
//
function handleCleanup() {
  buildResult.rebuild.dispose();

  if (childProcess) {
    childProcess.kill('SIGINT');
  }

  process.exit();
}

//
// Helper function to draw a spinner while tasks run.
//
async function nextTask(label, action) {
  spinner.text = label;
  spinner.start();

  try {
    await action();
    spinner.stop();
    console.log(`${chalk.green('✔')} ${label}`);
  } catch (err) {
    spinner.stop();
    console.error(`${chalk.red('✘')} ${err}`);
    process.exit(1);
  }
}

await nextTask('Cleaning up the previous build', async () => {
  await Promise.all([deleteAsync(outdir), deleteAsync(sitedir)]);
  await fs.mkdir(outdir, { recursive: true });
});

await nextTask('Generating component metadata', () => {
  return execPromise(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Wrapping components for React', () => {
  return execPromise(`node scripts/make-react.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Generating Web Types', () => {
  return execPromise(`node scripts/make-web-types.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Generating themes', () => {
  return execPromise(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Packaging up icons', () => {
  return execPromise(`node scripts/make-icons.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Running the TypeScript compiler', () => {
  return execPromise(`tsc --project ./tsconfig.prod.json --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Building source files', async () => {
  buildResult = await buildTheSource();
});

if (copydir) {
  // Copy the build output to an additional directory
  await nextTask(`Copying the build to "${copydir}"`, async () => {
    await deleteAsync(copydir);
    await copy(outdir, copydir);
  });
}

if (serve) {
  let result;

  // Spin up Eleventy and Wait for the search index to appear before proceeding. The search index is generated during
  // eleventy.after, so it appears after the docs are fully published. This is kinda hacky, but here we are.
  // Kick off the Eleventy dev server with --watch and --incremental
  await nextTask('Building docs', async () => {
    result = await buildTheDocs(true);
  });

  const bs = browserSync.create();
  const port = await getPort({ port: portNumbers(4000, 4999) });
  const browserSyncConfig = {
    startPath: '/',
    port,
    logLevel: 'silent',
    logPrefix: '[shoelace]',
    logFileChanges: true,
    notify: false,
    single: false,
    ghostMode: false,
    server: {
      baseDir: sitedir,
      routes: {
        '/dist': './dist'
      }
    }
  };

  // Launch browser sync
  bs.init(browserSyncConfig, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.cyan(`\n🥾 The dev server is available at ${url}`));

    // Log deferred output
    if (result.output.length > 0) {
      console.log('\n' + result.output.join('\n'));
    }

    // Log output that comes later on
    result.child.stdout.on('data', data => {
      console.log(data.toString());
    });
  });

  // Rebuild and reload when source files change
  bs.watch(['src/**/!(*.test).*']).on('change', async filename => {
    try {
      const isTheme = /^src\/themes/.test(filename);
      const isStylesheet = /(\.css|\.styles\.ts)$/.test(filename);

      // Rebuild the source
      await buildResult.rebuild();

      // Rebuild stylesheets when a theme file changes
      if (isTheme) {
        await execPromise(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
      }

      // Rebuild metadata (but not when styles are changed)
      if (!isStylesheet) {
        await execPromise(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
      }

      bs.reload();
    } catch (err) {
      console.error(chalk.red(err));
    }
  });

  // Reload without rebuilding when the docs change
  bs.watch([`${sitedir}/**/*.*`]).on('change', filename => {
    bs.reload();
  });
}

// Prod build
if (!serve) {
  let result;

  await nextTask('Building the docs', async () => {
    result = await buildTheDocs();
  });

  // Log deferred output
  if (result.output.length > 0) {
    console.log('\n' + result.output.join('\n'));
  }
}

// Cleanup on exit
process.on('SIGINT', handleCleanup);
process.on('SIGTERM', handleCleanup);
