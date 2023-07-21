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
import { fileURLToPath } from 'url';

// The projects root
const baseName = (...paths) => path.join(path.dirname(fileURLToPath(import.meta.url)), '..', ...paths);

/**
 * Recursively search for a package
 * @param {String} packageName The package
 * @param {String} baseDir The base directory to search for
 * @returns Absolute path to the given npm package root dir or null if package was not found
 */
const getPackagePath = async (packageName, baseDir) => {
  const searchPath = path.join(baseDir, 'node_modules', packageName);

  // We have reached the root of the file system. Nothing is there, skip!
  if (searchPath === path.join('/', 'node_modules', packageName)) {
    return null;
  }

  try {
    await fs.stat(searchPath);
    return searchPath;
  } catch {
    return await getPackagePath(packageName, path.join(baseDir, '..'));
  }
};

/**
 * Get a full file path to a given file in path, providing alternative spellings if wanted
 * @param {String} path The base path to search the files for
 * @param {Array:String} fileNames List of file names to search for
 * @returns The first found filename or null if nothing was found
 */
const getFileFromPackage = async (path, fileNames) => {
  const [fileName, ...rest] = fileNames;
  const filePath = `${path}/${fileName}`;

  if (!fileName) {
    return null;
  }

  try {
    await fs.stat(filePath);
    return filePath;
  } catch {
    return getFileFromPackage(path, rest);
  }
};

// Find the package path recursively to make sure it also works in mono repos
const iconPackagePath = await getPackagePath('bootstrap-icons', baseName('.'));

if (!iconPackagePath) {
  console.error(`
    ${chalk.red('✘')}
    'bootstrap-icons package was not found. Please install it via npm install --save bootstrap-icons'
  `);
  process.exit(1);
}

const iconPackageJSON = await getFileFromPackage(iconPackagePath, ['package.json']);

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/icons');

const iconPackageData = JSON.parse(await fs.readFile(iconPackageJSON, 'utf8'));
const version = iconPackageData.version;
const srcPath = `./.cache/icons/icons-${version}`;
const url = `https://github.com/twbs/icons/archive/v${version}.zip`;

let iconLicense = await getFileFromPackage(srcPath, ['LICENSE.md', 'LICENSE']);

// Download the source from GitHub (since not everything is published to npm)
if (!iconLicense) {
  await download(url, './.cache/icons', { extract: true });
  iconLicense = await getFileFromPackage(srcPath, ['LICENSE.md', 'LICENSE']);
}

// Copy icons
await deleteAsync([iconDir]);
await fs.mkdir(iconDir, { recursive: true });
await Promise.all([
  copy(`${srcPath}/icons`, iconDir),
  copy(iconLicense, path.join(iconDir, 'LICENSE.md')),
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
