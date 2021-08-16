import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
const matchReg = /\.litcss$/;
const cache = new Map();
const __dirname = path.resolve();
const dir = path.resolve(__dirname, 'src/components');
const dir2 = path.resolve(__dirname, 'src/styles');
var join = path.join;
import uglifycss from 'uglifycss';
import sass from 'node-sass';
function isFileExisted(filePath) {
  return fs.existsSync(filePath);
}

function getCssFiles(jsonPath) {
  let cssFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true && matchReg.test(fPath)) {
        cssFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
  return cssFiles;
}

const writeCssToFile = filePath => {
  setTimeout(function () {
    try {
      let result = sass.renderSync({
        file: filePath
      });
      result = uglifycss.processString(result.css.toString());
      var oldData = cache.get(filePath);
      const d = `import {css} from 'lit';\nexport default css\`${result}\`; `;
      if (oldData == undefined || oldData != d) {
        fs.writeFile(filePath + '.style.ts', d, function (err) {
          if (!err) {
            console.log(`write css to ${filePath + '.style.ts'} success `);
          } else {
            console.warn(`write css to ${filePath + '.ts'} fail `);
          }
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  }, 100);
};
[dir, dir2].forEach(dir => {
  const cssFiles = getCssFiles(dir);
  cssFiles.forEach(filePath => {
    if (!isFileExisted(filePath + '.style.ts')) {
      writeCssToFile(filePath);
    }
  });
});

// One-liner for current directory
chokidar
  .watch([dir, dir2], {
    ignored: /\.[tj]s$/
  })
  .on('change', path => {
    if (matchReg.test(path)) {
      writeCssToFile(path);
    }
  })
  .on('unlink', filepath => {
    fs.unlink(filepath + '.style.ts', error => {
      if (!error) {
        console.log('delete file  success ');
      }
    });
  });
