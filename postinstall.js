const copy = require('recursive-copy');

copy('./node_modules/bootstrap-icons/icons', './src/components/icon/icons', { overwrite: true }).catch(err =>
  console.error(err)
);
