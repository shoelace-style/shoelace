//
// This script copies stylesheets other than themes, then generates a corresponding Lit stylesheet in dist/styles
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import fs from 'fs';
import { mkdirSync } from 'fs';
import { globbySync } from 'globby';
import path from 'path';
import prettier from 'prettier';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const files = globbySync('./src/styles/exports/**/*.css');
const stylesDir = path.join(outdir, 'styles');

console.log('Generating export stylesheets');

mkdirSync(stylesDir, { recursive: true });

try {
  // Loop through each css file, copying it into dist
  files.forEach(file => {
    let source = fs.readFileSync(file, 'utf8');

    const css = prettier.format(source, {
      parser: 'css'
    });

    const cssFile = path.join(stylesDir, path.basename(file));

    fs.writeFileSync(cssFile, css, 'utf8');
  });
} catch (err) {
  console.error(chalk.red('Error generating export stylesheets!'));
  console.error(err);
}

// Copy the tokens.json over
try {
  const tokenDistPath = path.join(outdir, 'styles', 'tokens.json');
  fs.copyFileSync('./src/styles/tokens.json', tokenDistPath);
} catch (err) {
  console.error(chalk.red('Error writing tokens JSON file:'), err);
}
