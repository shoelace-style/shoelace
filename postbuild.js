const chalk = require('chalk');
const copy = require('recursive-copy');
const del = require('del');

(async () => {
  try {
    // Create the docs distribution
    console.log(chalk.cyan('Creating docs distribution 📚\n'));
    await del('./docs-dist');
    await Promise.all([copy('./docs', './docs-dist'), copy('./dist', './docs-dist/dist')]);
  } catch (err) {
    console.error(err);
  }
})();
