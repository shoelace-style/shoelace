//
// This script downloads and generates icons and icon metadata.
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import { deleteAsync } from 'del';
import download from 'download';
import fm from 'front-matter';
import { readFileSync, readdirSync, rename, mkdirSync, fstat } from 'fs';
import { stat, readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import path from 'path';
import { exit } from 'process';

console.log('Make-icons');

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/icons');

const iconPackageData = JSON.parse(readFileSync('./node_modules/heroicons/package.json', 'utf8'));

let numIcons = 0;

(async () => {
  try {
    const version = iconPackageData.version;
    console.log('Version:', version);
    const srcPath = `./.cache/icons/heroicons-${version}`;
    const url = `https://github.com/teamshares/heroicons/archive/v${version}.zip`;

    try {
      await stat(`${srcPath}/LICENSE`);
      console.log('Generating icons from cache');
    } catch {
      console.log(`Downloading and extracting Heroicons ${version} from GitHub 📦`);
      await download(url, './.cache/icons', { extract: true });
    }

    // Copy icons
    console.log(`Copying icons and license`);
    await deleteAsync([iconDir]);
    mkdirSync(iconDir, { recursive: true });
    await Promise.all([
      copy(`${srcPath}/flattened`, iconDir),
      copy(`${srcPath}/LICENSE`, path.join(iconDir, 'LICENSE.md')),
      copy(`${srcPath}/heroicons-sprite.svg`, './docs/assets/icons/sprite.svg', { overwrite: true }),
      copy(`${srcPath}/data/tags.js`, './docs/assets/icons/tags.js', { overwrite: true })
    ]);

    // Generate metadata
    console.log(`Generating icon metadata`);
    const tagsFile = await import(path.resolve('./docs/assets/icons/tags.js'));
    const tagsHash = tagsFile.tags;
    const metadata = [];
    const files = readdirSync(`${srcPath}/flattened`);
    numIcons = files.length;
    files.forEach(fileName => {
      const key = path.parse(fileName).name;
      let type = '';
      let categories = '';
      const stripped = key.replace('-solid', '').replace('-mini', '');
      let tags = tagsHash[stripped] || [];
      if (key.includes('-solid')) {
        type = 'fill';
        categories = ['24px'];
      } else if (key.includes('-mini')) {
        type = 'fill';
        categories = ['20px'];
      } else {
        type = 'outline';
        categories = ['24px'];
      }
      metadata.push({
        name: key,
        title: key.replace('-', ' '),
        type,
        categories,
        tags
      });
    });
    await writeFile(path.join(iconDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');

    console.log(chalk.cyan(`Successfully processed ${numIcons} icons ✨\n`));
  } catch (err) {
    console.error(err);
  }
})();
