import { deleteAsync } from 'del';
import { exec, spawn } from 'child_process';
import { globby } from 'globby';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import ora from 'ora';
import util from 'util';
import * as path from 'path';
import { readFileSync } from 'fs';
import { replace } from 'esbuild-plugin-replace';

const { serve } = commandLineArgs([{ name: 'serve', type: Boolean }]);
const outdir = 'dist';
const cdndir = 'cdn';
const sitedir = '_site';
const spinner = ora({ hideCursor: false }).start();
const execPromise = util.promisify(exec);
let childProcess;
let buildResults;

const bundleDirectories = [cdndir, outdir];
let packageData = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
const shoelaceVersion = JSON.stringify(packageData.version.toString());

//
// Runs 11ty and builds the docs. The returned promise resolves after the initial publish has completed. The child
// process and an array of strings containing any output are included in the resolved promise.
//
async function buildTheDocs(watch = false) {
  return new Promise(async (resolve, reject) => {
    const afterSignal = '[eleventy.after]';

    // Totally non-scientific way to handle errors. Perhaps its just better to resolve on stderr? :shrug:
    const errorSignal = 'Original error stack trace:';
    const args = ['@11ty/eleventy', '--quiet'];
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
      if (data.includes(afterSignal)) return; // don't log the signal
      output.push(data.toString());
    });

    child.stderr.on('data', data => {
      output.push(data.toString());
    });

    if (watch) {
      // The process doesn't terminate in watch mode so, before resolving, we listen for a known signal in stdout that
      // tells us when the first build completes.
      child.stdout.on('data', data => {
        if (data.includes(afterSignal)) {
          resolve({ child, output });
        }
      });

      child.stderr.on('data', data => {
        if (data.includes(errorSignal)) {
          // This closes the dev server, not sure if thats what we want?
          reject(output);
        }
      });
    } else {
      child.on('close', () => {
        resolve({ child, output });
      });
    }
  });
}

//
// Builds the source with esbuild.
//
async function buildTheSource() {
  const alwaysExternal = ['@lit/react', 'react'];

  const cdnConfig = {
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
    outdir: cdndir,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      // Floating UI requires this to be set
      'process.env.NODE_ENV': '"production"'
    },
    bundle: true,
    //
    // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
    // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
    //
    // We never bundle React or @lit/react though!
    //
    external: alwaysExternal,
    splitting: true,
    plugins: [
      replace({
        __SHOELACE_VERSION__: shoelaceVersion
      })
    ]
  };

  const npmConfig = {
    ...cdnConfig,
    external: undefined,
    minify: false,
    packages: 'external',
    outdir
  };

  if (serve) {
    // Use the context API to allow incremental dev builds
    const contexts = await Promise.all([esbuild.context(cdnConfig), esbuild.context(npmConfig)]);
    await Promise.all(contexts.map(context => context.rebuild()));
    return contexts;
  } else {
    // Use the standard API for production builds
    return await Promise.all([esbuild.build(cdnConfig), esbuild.build(npmConfig)]);
  }
}

//
// Called on SIGINT or SIGTERM to cleanup the build and child processes.
//
function handleCleanup() {
  buildResults.forEach(result => result.dispose());

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
    if (err.stdout) console.error(chalk.red(err.stdout));
    if (err.stderr) console.error(chalk.red(err.stderr));
    process.exit(1);
  }
}

await nextTask('Cleaning up the previous build', async () => {
  await Promise.all([deleteAsync(sitedir), ...bundleDirectories.map(dir => deleteAsync(dir))]);
  await fs.mkdir(outdir, { recursive: true });
});

await nextTask('Generating component metadata', () => {
  return Promise.all(
    bundleDirectories.map(dir => {
      return execPromise(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
    })
  );
});

await nextTask('Wrapping components for React', () => {
  return execPromise(`node scripts/make-react.js --outdir "${outdir}"`, { stdio: 'inherit' });
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

// Copy the above steps to the CDN directory directly so we don't need to twice the work for nothing.
await nextTask(`Themes, Icons, and TS Types to "${cdndir}"`, async () => {
  await deleteAsync(cdndir);
  await copy(outdir, cdndir);
});

await nextTask('Building source files', async () => {
  buildResults = await buildTheSource();
});

// Copy the CDN build to the docs (prod only; we use a virtual directory in dev)
if (!serve) {
  await nextTask(`Copying the build to "${sitedir}"`, async () => {
    await deleteAsync(sitedir);

    // We copy the CDN build because that has everything bundled. Yes this looks weird.
    // But if we do "/cdn" it requires changes all the docs to do /cdn instead of /dist.
    await copy(cdndir, path.join(sitedir, 'dist'));
  });
}

// Launch the dev server
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
        '/dist': './cdn'
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
  bs.watch('src/**/!(*.test).*').on('change', async filename => {
    console.log('[build] File changed: ', filename);

    try {
      const isTheme = /^src\/themes/.test(filename);
      const isStylesheet = /(\.css|\.styles\.ts)$/.test(filename);

      // Rebuild the source
      const rebuildResults = buildResults.map(result => result.rebuild());
      await Promise.all(rebuildResults);

      // Rebuild stylesheets when a theme file changes
      if (isTheme) {
        await Promise.all(
          bundleDirectories.map(dir => {
            execPromise(`node scripts/make-themes.js --outdir "${dir}"`, { stdio: 'inherit' });
          })
        );
      }

      // Rebuild metadata (but not when styles are changed)
      if (!isStylesheet) {
        await Promise.all(
          bundleDirectories.map(dir => {
            return execPromise(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
          })
        );
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

// Build for production
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
