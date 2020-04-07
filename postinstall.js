const copy = require('recursive-copy');

Promise.all([
  copy('./node_modules/bootstrap-icons/icons', './src/components/icon/icons', { overwrite: true }),
  copy('./node_modules/bootstrap-icons/LICENSE.md', './src/components/icon/icons/LICENSE.md', { overwrite: true })
]).catch(err => console.error(err));
