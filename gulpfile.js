const { version } = require('./package.json');
const { series, task, watch } = require('gulp');
const copy = require('recursive-copy');
const del = require('del');
const fs = require('fs').promises;
const mkdirp = require('mkdirp');
const path = require('path');

// Removes all generated files from the docs folder
async function cleanFiles(cb) {
  await del(['./docs/assets/data/custom.json', './docs/assets/dist']);
  cb();
}

// Copies custom data and dist to docs/assets
async function copyFiles(cb) {
  await mkdirp('./dist');
  await copy('./dist', './docs/assets/dist', { overwrite: true });
  cb();
}

// Copies custom data and dist to docs/assets and watches for changes
function watchFiles(cb) {
  watch(`./dist/**/*`, copyFiles);
  cb();
}

async function generateCustomData(cb) {
  const filename = './docs/assets/data/custom.json';
  const dir = path.dirname(filename);
  const customData = JSON.stringify({ version }, null, 2);

  await mkdirp(dir);
  await fs.writeFile(filename, customData, 'utf8');

  cb();
}

task('clean', cleanFiles);
task('copy', series(generateCustomData, copyFiles));
task('watch', series(generateCustomData, copyFiles, watchFiles));
