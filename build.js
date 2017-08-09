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

      PostCSS([
        AtImport,
        Autoprefixer({ browsers: ['last 2 versions', '> 5%', 'ie >= 11', 'iOS >= 8'] }),
        CSSnano({ safe: true })
      ])
        .process(css, { from: shoelaceCSS })
        .then((result) => resolve(result.css))
        .catch((err) => reject(err));
    }))

    // Write stylesheet to dist
    .then((styles) => new Promise((resolve, reject) => {
      let shoelaceCSS = Path.join(__dirname, 'dist/shoelace.css');

      // Update {version} in CSS
      styles = styles.replace(/\{version\}/g, __version);

      // Write output file
      FS.writeFile(shoelaceCSS, styles, 'utf8', (err) => {
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
    .then((scripts) => new Promise((resolve, reject) => {
      let shoelaceJS = Path.join(__dirname, 'dist/shoelace.js');

      // Update {version} in JS
      scripts = scripts.replace(/\{version\}/g, __version);

      // Write output file
      FS.writeFile(shoelaceJS, scripts, 'utf8', (err) => {
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
        // Update {version} in content
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach((key) => {
            let file = files[key];

            file.contents = new Buffer(
              file.contents
                .toString()
                .replace(/\{version\}/g, __version)
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
