const { parallel, watch } = require('gulp');
const copy = require('recursive-copy');
const path = require('path');
const through = require('through2');

function copyAssets(done) {
  copy('src/assets', 'docs/assets', { overwrite: true });
  done();
}

function copyDist(done) {
  copy('dist', 'docs/dist', { overwrite: true });
  done();
}

function copyReadmes(done) {
  copy('./src/components', './docs/components', {
    filter: '**/readme.md',
    overwrite: true,
    rename: filePath => path.dirname(filePath) + path.extname(filePath),
    transform: function(src, dest, stats) {
      return through(function(chunk, enc, done) {
        // Remove footer break
        const output = chunk.toString().replace(/\n----------------------------------------------\n/g, '');
        done(null, output);
      });
    }
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
  return watch('src/components/**/*.md', { ignoreInitial: false }, copyReadmes);
}

exports.default = parallel(watchAssets, watchDist, watchDocs);
