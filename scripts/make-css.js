//
// This script generates stylesheets from all *.styles.ts files in src/themes
//
import chalk from 'chalk';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import glob from 'globby';
import mkdirp from 'mkdirp';
import path from 'path';
import prettier from 'prettier';
import stripComments from 'strip-css-comments';

const files = glob.sync('./src/themes/**/*.styles.ts');
const outdir = './dist/themes';

mkdirp.sync(outdir);

try {
  files.map(async file => {
    const source = await fs.readFile(file, 'utf8');
    const css = prettier.format(stripComments(source.match(/export default css`(.*?)`;/s)[1]), { parser: 'css' });
    const filename = path.basename(file).replace('.styles.ts', '.css');
    const outfile = path.join(outdir, filename);
    await fs.writeFile(outfile, css, 'utf8');
  });

  console.log(chalk.cyan(`Successfully generated stylesheets 🎨\n`));
} catch (err) {
  console.error(chalk.red('Error generating styleseheets!'));
  console.error(err);
}
