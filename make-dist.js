const chalk = require('chalk');
const copy = require('recursive-copy');
const del = require('del');

(async () => {
  try {
    // Create the docs distribution
    console.log(chalk.cyan('Creating docs distribution 📚\n'));
    await del('./docs/dist');
    await copy('./dist', './docs/dist');
    await copy('./themes', './docs/themes', { overwrite: true });
  } catch (err) {
    console.error(err);
  }
})();
