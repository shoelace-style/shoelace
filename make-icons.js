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
    const srcPath = `./.cache/icons/icons-${version}`;
    const url = `https://github.com/twbs/icons/archive/v${version}.zip`;

    try {
      await fs.stat(`${srcPath}/LICENSE.md`);
      console.log(chalk.cyan('Generating icons from cache ♻️'));
    } catch {
      // Download the source from GitHub (since not everything is published to NPM)
      console.log(chalk.cyan(`Downloading and extracting Bootstrap Icons ${version} 📦`));
      await download(url, './.cache/icons', { extract: true });
    }

    // Copy icons
    console.log(chalk.cyan(`Copying icons and license 🚛`));
    await del(['./src/components/icon/icons']);
    await Promise.all([
      copy(`${srcPath}/icons`, './src/components/icon/icons'),
      copy(`${srcPath}/LICENSE.md`, './src/components/icon/icons/LICENSE.md'),
      copy(`${srcPath}/bootstrap-icons.svg`, './docs/assets/icons/sprite.svg', { overwrite: true })
    ]);

    // Generate metadata
    console.log(chalk.cyan(`Generating icon metadata 🏷`));
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

    console.log(chalk.green(`Successfully processed ${numIcons} icons! ✨\n`));
  } catch (err) {
    console.error(err);
  }
})();
