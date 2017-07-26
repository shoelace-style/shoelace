'use strict';

const Gulp = require('gulp-help')(require('gulp'));
const Chalk = require('chalk');
const CleanCSS = require('gulp-clean-css');
const Del = require('del');
const Path = require('path');
const Rename = require('gulp-rename');

////////////////////////////////////////////////////////////////////////////////////////////////////
// Config
////////////////////////////////////////////////////////////////////////////////////////////////////

let styles = {
  source: Path.join(__dirname, 'css/shoelace.css'),
  target: Path.join(__dirname, 'dist')
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Build functions
////////////////////////////////////////////////////////////////////////////////////////////////////

// Compiles styles in source and outputs them in target
function buildStyles(source, target) {
  console.log(Chalk.yellow('Building styles...'));
  return Gulp.src(source)
    .pipe(Rename({ suffix: '.min' }))
    .pipe(CleanCSS({
      format: 'keep-breaks',
      specialComments: 'all'
    }))
    .on('error', (err) => {
      console.error(Chalk.red(err.message));
    })
    .pipe(Gulp.dest(target))
    .on('end', () => {
      console.log(Chalk.green('✔︎ Styles at ' + new Date()));
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Build tasks
////////////////////////////////////////////////////////////////////////////////////////////////////

// Build styles
Gulp.task('build:styles', 'Build styles.', ['clean:styles'], () => {
  buildStyles(styles.source, styles.target);
});

// Build all
Gulp.task('build', 'Run all build tasks.', [
  'build:styles'
]);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Clean tasks
////////////////////////////////////////////////////////////////////////////////////////////////////

// Clean styles
Gulp.task('clean:styles', 'Delete generated styles.', () => {
  return Del(styles.target);
});

// Clean all
Gulp.task('clean', 'Delete all generated files.', [
  'clean:styles'
]);

// Default
Gulp.task('default', 'Run the default task.', ['help']);
