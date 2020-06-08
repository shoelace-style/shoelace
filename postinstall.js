const chalk = require('chalk');
const copy = require('recursive-copy');
const del = require('del');

(async () => {
  try {
    // Copy Bootstrap Icons to src/components/icon/icons since local assets can't be linked from node_modules
    console.log(chalk.cyan('Copying icons 📦\n'));

    await del('./src/components/icon/icons');
    await copy('./node_modules/bootstrap-icons/icons', './src/components/icon/icons');
    await copy('./node_modules/bootstrap-icons/LICENSE.md', './src/components/icon/icons/LICENSE.md');
  } catch (err) {
    console.error(err);
  }
})();
