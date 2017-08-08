/* eslint prefer-arrow-callback: "warn" */
'use strict';

global.__version = require('./package.json').version;

const AtImport = require('postcss-import');
const Autoprefixer = require('autoprefixer');
const Chalk = require('chalk');
const CSSnano = require('cssnano');
const Del = require('del');
const FS = require('fs');
const Layouts = require('metalsmith-layouts');
const Markdown = require('metalsmith-markdown');
const Metalsmith = require('metalsmith');
const Path = require('path');
const PostCSS = require('postcss');
const Program = require('commander');
const UglifyJS = require('uglify-js');

let stats;

// Initialize CLI
Program
  .version(__version)
  .option('--build', 'Builds a release')
  .option('--clean', 'Removes existing release files')
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

// Run build task
if(Program.build) {
  Promise.resolve()
    // Remove the dist folder
    .then(() => Del(Path.join(__dirname, 'dist')))

    // Create the dist folder
    .then(() => FS.mkdirSync(Path.join(__dirname, 'dist')))

    // Generate minified stylesheet
    .then(() => new Promise((resolve, reject) => {
      let shoelaceCSS = Path.join(__dirname, 'source/css/shoelace.css');
      let css = FS.readFileSync(shoelaceCSS, 'utf8');
      let output = {
        stats: {
          originalSize: css.length
        }
      };

      PostCSS([
        Autoprefixer({ browsers: ['last 2 versions', '> 5%', 'ie >= 11', 'iOS >= 8'] }),
        AtImport,
        CSSnano({ safe: true })
      ])
        .process(css, { from: shoelaceCSS })
        .then((result) => {
          output.styles = result.css;
          output.stats.minifiedSize = output.styles.length;
          resolve(output);
        })
        .catch((err) => reject(err));
    }))

    // Write stylesheet to dist
    .then((output) => new Promise((resolve, reject) => {
      let shoelaceCSS = Path.join(__dirname, 'dist/shoelace.css');

      // Remember stats
      stats = {
        originalSize: (output.stats.originalSize / 1024).toFixed(1) + 'KB',
        minifiedSize: (output.stats.minifiedSize / 1024).toFixed(1) + 'KB'
      };

      // Update {placeholders} in CSS
      output.styles = output.styles
        .replace(/\{version\}/g, __version)
        .replace(/\{originalSize\}/, stats.originalSize)
        .replace(/\{minifiedSize\}/, stats.minifiedSize);

      // Write output file
      FS.writeFile(shoelaceCSS, output.styles, 'utf8', (err) => {
        if(err) {
          reject(err);
          return;
        }
        console.log(Chalk.green('CSS Minified: %s! 💪'), Path.relative(__dirname, shoelaceCSS));

        resolve();
      });
    }))

    // Minify scripts
    .then(() => new Promise((resolve, reject) => {
      let scripts = {
        'dropdowns.js': FS.readFileSync(Path.join(__dirname, 'source/js/dropdowns.js'), 'utf8'),
        'tabs.js': FS.readFileSync(Path.join(__dirname, 'source/js/tabs.js'), 'utf8')
      };

      let output = UglifyJS.minify(scripts, {
        output: {
          comments: /^!/
        }
      });
      if(output.error) {
        reject(output.error);
        return;
      }

      resolve(output);
    }))

    // Write minified scripts to dist
    .then((output) => new Promise((resolve, reject) => {
      let shoelaceJS = Path.join(__dirname, 'dist/shoelace.js');

      // Update {placeholders} in JS
      output.code = output.code.replace(/\{version\}/g, __version);

      // Write output file
      FS.writeFile(shoelaceJS, output.code, 'utf8', (err) => {
        if(err) {
          reject(err);
          return;
        }
        console.log(Chalk.green('JS Minified: %s! 💪'), Path.relative(__dirname, shoelaceJS));

        resolve();
      });
    }))

    // Generate the docs
    .then(() => new Promise((resolve, reject) => {
      Metalsmith(__dirname)
        .source('./source/docs')
        .destination('./docs')
        .clean(true)
        .use(Markdown())
        .use(Layouts({
          engine: 'handlebars',
          directory: './source/layouts',
          rename: false
        }))
        // Update {placeholders} in content
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach((key) => {
            let file = files[key];

            file.contents = new Buffer(
              file.contents
                .toString()
                .replace(/\{version\}/g, __version)
                .replace(/\{minifiedSize\}/g, stats.minifiedSize)
                .replace(/\{originalSize\}/g, stats.originalSize)
            );
          });

          done();
        })
        .build((err) => {
          if(err) {
            reject(err);
            return;
          }
          console.log(Chalk.green('Docs have been generated! 📚'));

          resolve();
        });
    }))

    // Exit with success
    .then(() => process.exit(1))

    // Handle errors
    .catch((err) => {
      console.error(Chalk.red(err));
      process.exit(-1);
    });
}

// Clean task
if(Program.clean) {
  let dist = Path.join(__dirname, 'dist');

  Del(dist)
    .then(() => {
      console.log(Chalk.green('%s has been removed.'), dist);
      process.exit(1);
    })
    .catch((err) => {
      console.error(Chalk.red('Unable to delete dist directory: ' + err));
      process.exit(-1);
    });
}
