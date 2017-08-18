/* eslint prefer-arrow-callback: "warn" */
'use strict';

global.__version = require('./package.json').version;

require('dotenv').config();
const Promise = require('bluebird');
const AtImport = require('postcss-import');
const Chalk = require('chalk');
const CSSnano = require('cssnano');
const CSSnext = require('postcss-cssnext');
const Del = require('del');
const FS = Promise.promisifyAll(require('fs'));
const Layouts = require('metalsmith-layouts');
const Markdown = require('metalsmith-markdown');
const Metalsmith = require('metalsmith');
const Path = require('path');
const PostCSS = require('postcss');
const Program = require('commander');
const S3 = require('s3');
const UglifyJS = require('uglify-js');
const Watch = require('watch');

//
// Builds all doc pages.
//
// Returns a promise.
//
function buildDocs() {
  return Promise.resolve()
    .then(() => new Promise((resolve, reject) => {
      Metalsmith(__dirname)
        .source('./source/docs')
        .destination('./docs')
        .clean(true)
        .use(Markdown())
        .metadata({
          version: __version
        })
        .use(Layouts({
          engine: 'handlebars',
          directory: './source/layouts',
          rename: false
        }))
        // Update {{version}} in content since it's not processed with Handlebars
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach((key) => {
            let file = files[key];

            file.contents = new Buffer(
              file.contents
                .toString()
                .replace(/\{\{version\}\}/g, __version)
            );
          });

          done();
        })
        .build((err) => {
          if(err) {
            reject(err);
            return;
          }
          console.log(Chalk.green('Docs generated! 📚'));

          resolve();
        });
    }));
}

//
// Builds all scripts.
//
// Returns a promise.
//
function buildScripts() {
  return Promise.resolve()
    // Create the dist folder if it doesn't exist
    .then(() => {
      if(!FS.existsSync(Path.join(__dirname, 'dist'))) {
        return FS.mkdirAsync(Path.join(__dirname, 'dist'));
      }
    })

    // Generate minified scripts
    .then(() => new Promise((resolve, reject) => {
      let scripts = {
        'dropdowns.js': FS.readFileSync(Path.join(__dirname, 'source/js/dropdowns.js'), 'utf8'),
        'tabs.js': FS.readFileSync(Path.join(__dirname, 'source/js/tabs.js'), 'utf8')
      };

      let result = UglifyJS.minify(scripts, {
        output: {
          comments: /^!/
        }
      });
      if(result.error) {
        reject(result.error);
        return;
      }

      resolve(result.code);
    }))

    // Write minified scripts to dist
    .then((scripts) => {
      let file = Path.join(__dirname, 'dist/shoelace.js');

      // Update {{version}} in JS since it's not processed with Handlebars
      scripts = scripts.replace(/\{\{version\}\}/g, __version);

      // Output a message
      console.log(Chalk.green('JS processed: %s! 🐭'), Path.relative(__dirname, file));

      // Write output file
      return FS.writeFileAsync(file, scripts, 'utf8');
    });
}

//
// Builds all stylesheets.
//
// Returns a promise.
//
function buildStyles() {
  return Promise.resolve()
    // Create the dist folder if it doesn't exist
    .then(() => {
      if(!FS.existsSync(Path.join(__dirname, 'dist'))) {
        return FS.mkdirAsync(Path.join(__dirname, 'dist'));
      }
    })

    // Generate minified stylesheet
    .then(() => {
      let file = Path.join(__dirname, 'source/css/shoelace.css');
      let css = FS.readFileSync(file, 'utf8');

      return PostCSS([
        AtImport,
        CSSnext({
          features: {
            rem: false
          }
        }),
        CSSnano({
          autoprefixer: false,
          safe: true
        })
      ]).process(css, { from: file });
    })

    // Write stylesheet to dist
    .then((result) => {
      let file = Path.join(__dirname, 'dist/shoelace.css');

      // Update {{version}} in CSS since it's not processed with Handlebars
      result.css = result.css.replace(/\{\{version\}\}/g, __version);

      // Output a message
      console.log(Chalk.green('CSS processed: %s! 🦋'), Path.relative(__dirname, file));

      // Write output file
      return FS.writeFileAsync(file, result.css, 'utf8');
    });
}

//
// Publishes the dist folder to an S3 bucket.
//
//
//
function publishToS3() {
  return new Promise((resolve, reject) => {
    const client = S3.createClient({
      s3Options: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      }
    });

    // Sync the local /dist directory to /{version} in the S3 bucket
    let uploader = client.uploadDir({
      localDir: Path.join(__dirname, 'dist'),
      deleteRemoved: true,
      s3Params: {
        ACL: process.env.S3_ACL,
        Prefix: __version,
        Bucket: process.env.S3_BUCKET
      }
    });

    uploader.on('error', (err) => {
      reject(err);
    });

    uploader.on('end', () => {
      console.log(Chalk.green('%s has been published to S3! ☁️'), __version);
      resolve();
    });
  });
}

//
// Watches a directory for changes
//
//  - options (object)
//    - path (string) - the path of the directory to watch.
//    - ready (function) - callback to execute after initializing.
//    - change (function(event, file)) - callback to execute when a file is changed.
//
// No return value.
//
function watch(options) {
  options = options || {};

  Watch.watchTree(options.path, {
    ignoreDotFiles: true,
    interval: 1
  }, (file, current, previous) => {
    if(typeof file === 'object' && previous === null && current === null) {
      if(typeof options.ready === 'function') options.ready();
    } else if(previous === null) {
      if(typeof options.change === 'function') options.change({ type: 'created' }, file);
    } else if(current.nlink === 0) {
      if(typeof options.change === 'function') options.change({ type: 'deleted' }, file);
    } else {
      if(typeof options.change === 'function') options.change({ type: 'modified' }, file);
    }
  });
}

// Initialize CLI
Program
  .version(__version)
  .option('--build', 'Builds a release')
  .option('--clean', 'Removes existing release')
  .option('--s3', 'Publish lastest release to an S3 bucket (requires .env)')
  .option('--watch', 'Watch for changes and build automatically')
  .on('--help', () => {
    console.log(Chalk.cyan('\n  Version %s\n'), __version);
    process.exit(1);
  })
  .parse(process.argv);

// Show help by default
if(!process.argv.slice(2).length) {
  Program.outputHelp();
  process.exit(1);
}

// Build
if(Program.build) {
  Promise.resolve()
    // Remove the dist folder
    .then(() => Del(Path.join(__dirname, 'dist')))

    // Build styles
    .then(() => buildStyles())

    // Minify scripts
    .then(() => buildScripts())

    // Generate docs
    .then(() => buildDocs())

    // Publish to S3 if --s3 flag is set
    .then(() => Program.s3 ? publishToS3() : null)

    // Exit with success
    .then(() => process.exit(1))

    // Handle errors
    .catch((err) => {
      console.error(Chalk.red(err));
      process.exit(-1);
    });
} else {
  // Can't use the --s3 options without --build
  if(Program.s3) {
    console.error(Chalk.yellow('The --s3 flag can only be used with --build'));
    process.exit(-1);
  }
}

// Clean
if(Program.clean) {
  Promise.resolve()
    // Delete /dist
    .then(() => Del(Path.join(__dirname, 'dist')))
    .then(() => {
      console.log(Chalk.green('/dist has been removed.'));
    })

    // Delete /docs
    .then(() => Del(Path.join(__dirname, 'docs')))
    .then(() => {
      console.log(Chalk.green('/docs has been removed.'));
    })

    // Exit with success
    .then(() => process.exit(1))

    // Handle errors
    .catch((err) => {
      console.error(Chalk.red(err));
      process.exit(-1);
    });
}

// Watch
if(Program.watch) {
  // Watch styles
  watch({
    path: Path.join(__dirname, 'source/css'),
    ready: () => console.log(Chalk.cyan('Watching for style changes...')),
    change: (event) => {
      if(event.type === 'created' || event.type === 'modified') {
        buildStyles();
      }
    }
  });

  // Watch scripts
  watch({
    path: Path.join(__dirname, 'source/js'),
    ready: () => console.log(Chalk.cyan('Watching for scripts changes...')),
    change: (event) => {
      if(event.type === 'created' || event.type === 'modified') {
        buildScripts();
      }
    }
  });

  // Watch docs
  watch({
    path: Path.join(__dirname, 'source/docs'),
    ready: () => console.log(Chalk.cyan('Watching for docs changes...')),
    change: (event) => {
      if(event.type === 'created' || event.type === 'modified') {
        buildDocs();
      }
    }
  });
}
