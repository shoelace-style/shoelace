const chalk = require('chalk');
const copy = require('recursive-copy');
const del = require('del');

//
// Create the website folder
//
(async () => {
  console.log(chalk.cyan('Creating website distribution 📚\n'));

  try {
    await del('./website');

    await Promise.all([copy('./docs', './website'), copy('./dist', './website/dist')]);
  } catch (err) {
    console.error(err);
  }
})();
