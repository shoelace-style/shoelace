const { parallel, watch } = require('gulp');
const copy = require('recursive-copy');
const path = require('path');

function copyAssets(done) {
  copy('src/assets', 'docs/assets', { overwrite: true });
  done();
}

function copyDist(done) {
  copy('dist', 'docs/dist', { overwrite: true });
  done();
}

function copyDocs(done) {
  copy('./src/components', './docs/components', {
    filter: '**/readme.md',
    overwrite: true,
    rename: filePath => path.dirname(filePath) + path.extname(filePath)
  });
  done();
}

function watchAssets() {
  return watch('src/assets/**/*', { ignoreInitial: false }, copyAssets);
}

function watchDist() {
  return watch('dist/**/*', { ignoreInitial: false }, copyDist);
}

function watchDocs() {
  return watch('src/components/**/*.md', { ignoreInitial: false }, copyDocs);
}

exports.default = parallel(watchAssets, watchDist, watchDocs);
