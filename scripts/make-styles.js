//
// This script copies stylesheets other than themes, then generates a corresponding Lit stylesheet in dist/styles
//
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

// Loop through each css file, copying it into dist
files.forEach(async file => {
  let source = fs.readFileSync(file, 'utf8');

  const css = await prettier.format(source, {
    parser: 'css'
  });

  const cssFile = path.join(stylesDir, path.basename(file));

  fs.writeFileSync(cssFile, css, 'utf8');
});

// Copy the tokens.json over
const tokenDistPath = path.join(outdir, 'styles', 'tokens.json');
fs.copyFileSync('./src/styles/tokens.json', tokenDistPath);
