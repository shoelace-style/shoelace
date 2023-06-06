import chalk from 'chalk';
import { execSync } from 'child_process';
import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import esbuild from 'esbuild';
import fs from 'fs';
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

deleteSync(outdir);
fs.mkdirSync(outdir, { recursive: true });

(async () => {
  try {
    execSync(`node scripts/make-metadata.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-search.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-react.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-web-types.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
    execSync(`node scripts/make-icons.js --outdir "${outdir}"`, { stdio: 'inherit' });
    if (types) {
      console.log('Running the TypeScript compiler...');
      execSync(`tsc --project ./tsconfig.prod.json --outdir "${outdir}"`, { stdio: 'inherit' });
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
    })
    .catch(err => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  // Copy the build output to an additional directory
  if (copydir) {
    deleteSync(copydir);
    copy(outdir, copydir);
  }

  console.log(chalk.green(`The build has been generated at ${outdir} 📦\n`));

  if (serve) {
    // Dev
    execSync('npx @11ty/eleventy --serve --incremental', { stdio: 'inherit', cwd: 'docs' });
  } else {
    // Build
    execSync('npx @11ty/eleventy', { stdio: 'inherit', cwd: 'docs' });
  }

  // Cleanup on exit
  process.on('SIGTERM', () => buildResult.rebuild.dispose());
})();
