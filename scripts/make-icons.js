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

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/icons');

const iconPackageData = JSON.parse(await fs.readFile('./node_modules/bootstrap-icons/package.json', 'utf8'));

const version = iconPackageData.version;
const srcPath = `./.cache/icons/icons-${version}`;
const url = `https://github.com/twbs/icons/archive/v${version}.zip`;

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
  copy(`${srcPath}/icons`, iconDir),
  copy(`${srcPath}/LICENSE.md`, path.join(iconDir, 'LICENSE.md')),
  copy(`${srcPath}/bootstrap-icons.svg`, './docs/assets/images/sprite.svg', { overwrite: true })
]);

// Generate metadata
const files = await globby(`${srcPath}/docs/content/icons/**/*.md`);
const metadata = await Promise.all(
  files.map(async file => {
    const name = path.basename(file, path.extname(file));
    const data = fm(await fs.readFile(file, 'utf8')).attributes;

    return {
      name,
      title: data.title,
      categories: data.categories,
      tags: data.tags
    };
  })
);

await fs.writeFile(path.join(iconDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');
