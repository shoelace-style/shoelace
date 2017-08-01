'use strict';

global.__version = require('./package.json').version;

require('dotenv').config();
const Chalk = require('chalk');
const Del = require('del');
const FS = require('fs');
const Path = require('path');
const Program = require('commander');
const S3 = require('s3');
const PostCSS = require('postcss');
const Autoprefixer = require('autoprefixer');
const AtImport = require('postcss-import');
const CSSnano = require('cssnano');

let source = Path.join(__dirname, 'source/css');
let dist = Path.join(__dirname, 'dist');
let docsFile = Path.join(__dirname, 'index.html');
let inFile = Path.join(source, 'shoelace.css');
let outFile = Path.join(dist, 'shoelace.css');

// Initialize CLI
Program
  .version(__version)
  .option('--clean', 'Removes the local dist directory')
  .option('--build', 'Builds a release')
  .option('--s3', 'Publish latest release to an S3 bucket (requires .env file)')
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
    // Generate minified version
    .then(() => new Promise((resolve, reject) =>{
      let css = FS.readFileSync(inFile, 'utf8');
      let output = {
        stats: {
          originalSize: css.length
        }
      };

      PostCSS([Autoprefixer({
        browsers: ['last 2 versions', '> 5%', 'ie >= 11', 'iOS >= 8']
      }), AtImport, CSSnano({
        safe: true
      })]).process(css, {
        from: inFile
      }).then((result) => {
        output.styles = result.css;
        output.stats.minifiedSize = output.styles.length;
        resolve(output);
      }).catch((err) => {
        reject(err);
      });
    }))
    // Write dist files
    .then((output) => new Promise((resolve, reject) => {
      // Get stats
      let stats = {
        originalSize: (output.stats.originalSize / 1024).toFixed(1) + 'KB', // KB
        minifiedSize: (output.stats.minifiedSize / 1024).toFixed(1) + 'KB' // KB
      };

      // Update placeholders in CSS
      output.styles = output.styles
        .replace(/\{version\}/g, __version)
        .replace(/\{originalSize\}/, stats.originalSize)
        .replace(/\{minifiedSize\}/, stats.minifiedSize);

      // Create the dist folder if it doesn't exist
      try {
        FS.statSync(dist);
      } catch(err) {
        FS.mkdirSync(dist);
      }

      // Write output file
      FS.writeFile(outFile, output.styles, 'utf8', (err) => {
        if(err) {
          reject(err);
          return;
        }
        console.log(Chalk.green('CSS Minified: %s! 💪'), Path.relative(__dirname, outFile));

        resolve(stats);
      });
    }))
    // Update docs
    .then((stats) => new Promise((resolve, reject) => {
      // Update placeholders
      let content = FS.readFileSync(docsFile, 'utf8');
      content = content
        .replace(/<span data-version>(.*?)<\/span>/g, '<span data-version>' + __version + '</span>')
        .replace(/<span data-originalSize>(.*?)<\/span>/g, '<span data-originalSize>' + stats.originalSize + '</span>')
        .replace(/<span data-minifiedSize>(.*?)<\/span>/g, '<span data-minifiedSize>' + stats.minifiedSize + '</span>');

      // Write docs file
      FS.writeFile(docsFile, content, 'utf8', (err) => {
        if(err) {
          reject(err);
          return;
        }
        console.log(Chalk.green('Docs have been updated! 📚'));

        resolve();
      });
    }))
    // Publish to S3
    .then(() => new Promise((resolve, reject) => {
      // Skip if the --s3 flag is missing
      if(!Program.s3) {
        resolve();
        return;
      }

      const client = S3.createClient({
        s3Options: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY
        }
      });

      // Sync the local /dist directory to /{version} in the S3 bucket
      let uploader = client.uploadDir({
        localDir: dist,
        deleteRemoved: true,
        s3Params: {
          ACL: process.env.S3_ACL,
          Prefix: __version,
          Bucket: process.env.S3_BUCKET
        }
      });
      uploader.on('error', (err) => {
        reject('Unable to publish to S3: ' + err);
        return;
      });
      uploader.on('end', () => {
        console.log(Chalk.green('%s has been published to S3! ☁️'), __version);
        resolve();
      });
    }))
    .then(() => process.exit(1))
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

// Clean task
if(Program.clean) {
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
