const { parallel, watch } = require('gulp');
const copy = require('recursive-copy');
const del = require('del');
const path = require('path');
const through = require('through2');

async function cleanReadmes(done) {
  await del('./docs/components');
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

function watchReadmes() {
  return watch('src/components/**/*.md', copyReadmes);
}

exports.clean = parallel(cleanReadmes);
exports.copy = parallel(copyReadmes);
exports.watch = parallel(watchReadmes);

exports.default = parallel(exports.clean, exports.copy, exports.watch);
