const Promise = require('bluebird');
const promisify = require('util').promisify;
const chalk = require('chalk');
const copy = require('recursive-copy');
const del = require('del');
const download = require('download');
const fm = require('front-matter');
const fs = require('fs').promises;
const glob = promisify(require('glob'));
const path = require('path');

let numIcons = 0;

(async () => {
  try {
    const version = require('./node_modules/bootstrap-icons/package.json').version;
    const srcPath = `./temp/icons-${version}`;
    const url = `https://github.com/twbs/icons/archive/v${version}.zip`;

    // Download the source from GitHub (since not everything is published to NPM)
    console.log(chalk.cyan(`\nDownloading and extracting ${version}... 📦\n`));
    await del(['./src/components/icon/icons', './temp']);
    await download(url, './temp', { extract: true });

    // Copy icons
    console.log(chalk.cyan(`Copying icons and license... 🚛\n`));
    await Promise.all([
      copy(`${srcPath}/icons`, './src/components/icon/icons'),
      copy(`${srcPath}/LICENSE.md`, './src/components/icon/icons/LICENSE.md')
    ]);

    // Generate metadata
    console.log(chalk.cyan(`Generating icon metadata... 🏷\n`));
    const files = await glob(`${srcPath}/docs/content/icons/**/*.md`);

    const metadata = await Promise.map(files, async file => {
      const name = path.basename(file, path.extname(file));
      const data = fm(await fs.readFile(file, 'utf8')).attributes;
      numIcons++;

      return {
        name,
        title: data.title,
        categories: data.categories,
        tags: data.tags
      };
    });

    await fs.writeFile('./src/components/icon/icons/icons.json', JSON.stringify(metadata, null, 2), 'utf8');

    // More cleanup
    console.log(chalk.cyan(`Cleaning up... 🧹\n`));
    await del('./temp');

    console.log(chalk.green(`Successfully processed ${numIcons} icons! ✨\n`));
  } catch (err) {
    console.error(err);
  }
})();
