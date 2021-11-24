//
// This script generates stylesheets from all *.styles.ts files in src/themes
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import fs from 'fs/promises';
import glob from 'globby';
import mkdirp from 'mkdirp';
import path from 'path';
import prettier from 'prettier';
import stripComments from 'strip-css-comments';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const files = glob.sync('./src/themes/**/*.styles.ts');
const themesDir = path.join(outdir, 'themes');

console.log('Generating stylesheets');

mkdirp.sync(themesDir);

try {
  files.map(async file => {
    const source = await fs.readFile(file, 'utf8');
    const css = source.match(/export default css`(.*?)`;/s)[1];

    // We're currently scraping for CSS with a regex, so we can't use interpolation at the moment
    if (css.includes('${')) {
      console.error(
        chalk.red(`Template literal expressions are not currently supported in theme stylesheets: ${file}`)
      );
      process.exit(1);
    }

    const formattedStyles = prettier.format(stripComments(css), { parser: 'css' });
    const filename = path.basename(file).replace('.styles.ts', '.css');
    const outfile = path.join(themesDir, filename);
    await fs.writeFile(outfile, formattedStyles, 'utf8');
  });
} catch (err) {
  console.error(chalk.red('Error generating styleseheets!'));
  console.error(err);
}
