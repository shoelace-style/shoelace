'use strict';

global.__version = require('./package.json').version;

const CleanCSS = require('clean-css');
const Chalk = require('chalk');
const FS = require('fs');
const Path = require('path');

let source = Path.join(__dirname, 'source/css');
let dist = Path.join(__dirname, 'dist');
let docsFile = Path.join(__dirname, 'docs/index.html');
let inFile = Path.join(source, 'shoelace.css');
let outFile = Path.join(dist, 'shoelace.css');

const clean = new CleanCSS({
  // format: 'beautify',
  inline: ['local'],
  rebaseTo: Path.dirname(dist),
  specialComments: 'all'
});

// Generate minified version
clean.minify({
  [inFile]: { styles: FS.readFileSync(inFile, 'utf8') }
}, (errors, output) => {
  // Show errors
  if(errors) {
    errors.forEach((err) => console.log(Chalk.red(err)));
    return;
  }

  // Get stats
  let originalSize = parseInt(output.stats.originalSize / 1000) + 'KB'; // KB
  let minifiedSize = parseInt(output.stats.minifiedSize / 1000) + 'KB'; // KB

  // Show output warnings and errors
  output.warnings.forEach((err) => console.log(Chalk.red(err)));
  output.errors.forEach((err) => console.log(Chalk.red(err)));

  // Update placeholders in CSS
  output.styles = output.styles
    .replace('{version}', __version)
    .replace('{originalSize}', originalSize)
    .replace('{minifiedSize}', minifiedSize);

  // Write output file
  FS.writeFile(outFile, output.styles, 'utf8', (err) => {
    if(err) {
      console.error(Chalk.red(err));
      return;
    }
    console.log(Chalk.green('CSS Minified at %s! 💪'), Path.relative(__dirname, outFile));
  });

  // Update placeholders in docs
  let content = FS.readFileSync(docsFile, 'utf8');
  content = content
    .replace(/<span data-placeholder="version">(.*?)<\/span>/, '<span data-placeholder="version">' + __version + '</span>')
    .replace(/<span data-placeholder="originalSize">(.*?)<\/span>/, '<span data-placeholder="originalSize">' + originalSize + '</span>')
    .replace(/<span data-placeholder="minifiedSize">(.*?)<\/span>/, '<span data-placeholder="minifiedSize">' + minifiedSize + '</span>');

  // Write docs file
  FS.writeFile(docsFile, content, 'utf8', (err) => {
    if(err) {
      console.error(Chalk.red(err));
      return;
    }
    console.log(Chalk.green('Docs have been updated! 📚'));
  });

});
