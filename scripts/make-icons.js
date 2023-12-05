//
// This script downloads and generates icons and icon metadata.
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import { deleteAsync } from 'del';
import download from 'download';
import fm from 'front-matter';
import fs from 'fs/promises';
import { globby } from 'globby';
import path from 'path';
import { exit } from 'process';

console.log('Make-icons');

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/icons');

const iconPackageData = JSON.parse(await fs.readFile('./node_modules/heroicons/package.json', 'utf8'));

const version = iconPackageData.version;
const srcPath = `./.cache/icons/heroicons-${version}`;
const url = `https://github.com/teamshares/heroicons/archive/v${version}.zip`;

try {
  await fs.stat(`${srcPath}/LICENSE.md`);
} catch {
  // Download the source from GitHub (since not everything is published to npm)
  await download(url, './.cache/icons', { extract: true });
}

// Copy icons
await deleteAsync([iconDir]);
await fs.mkdir(iconDir, { recursive: true });
await Promise.all([
  copy(`${srcPath}/flattened`, iconDir),
  copy(`${srcPath}/LICENSE`, path.join(iconDir, 'LICENSE.md')),
  copy(`${srcPath}/heroicons-sprite.svg`, './docs/assets/images/sprite.svg', { overwrite: true }),
  copy(`${srcPath}/data/tags.js`, './docs/assets/icons/tags.js', { overwrite: true })
]);

// Generate metadata

const files = await globby(`${srcPath}/flattened`);
const tagsFile = await import(path.resolve('./docs/assets/icons/tags.js'));
const tagsHash = tagsFile.tags;
const metadata = await Promise.all(
  files.map(async file => {
    const name = path.basename(file, path.extname(file));
    // const data = fm(await fs.readFile(file, 'utf8')).attributes;
    let type = '';
    let categories = '';
    const stripped = name.replace('-solid', '').replace('-mini', '');
    let tags = tagsHash[stripped] || [];
    if (name.includes('-solid')) {
      type = 'fill';
      categories = ['24px'];
    } else if (name.includes('-mini')) {
      type = 'fill';
      categories = ['20px'];
    } else {
      type = 'outline';
      categories = ['24px'];
    }

    return {
      name,
      title: name.replace('-', ' '),
      type,
      categories,
      tags: tags
    };
  })
);

await fs.writeFile(path.join(iconDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');
console.log(chalk.cyan(`Successfully processed ${files.length} icons ✨\n`));
