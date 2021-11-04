import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import fs from 'fs';
import del from 'del';
import mkdirp from 'mkdirp';
import path from 'path';
import pascalCase from 'pascal-case';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.cjs';
import { execSync } from 'child_process';
import { getAllComponents } from './shared.js';

const outdir = path.join('./src/react');

// Clear build directory
del.sync(outdir);
mkdirp.sync(outdir);

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync('./dist/custom-elements.json', 'utf8'));

// Wrap components
console.log('Wrapping components for React...');

const components = getAllComponents(metadata);
const index = [];

components.map(component => {
  const tagWithoutPrefix = component.tagName.replace(/^sl-/, '');
  const componentDir = path.join(outdir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = component.modulePath.replace(/^src\//, '').replace(/\.ts$/, '');

  mkdirp.sync(componentDir);

  const events = (component.events || []).map(event => `${`on${pascalCase(event.name)}`}: '${event.name}'`).join(',\n');

  const source = prettier.format(
    `
      import * as React from 'react';
      import { createComponent } from '@lit-labs/react';
      import Component from '../../${importPath}';

      export default createComponent(
        React,
        '${component.tagName}',
        Component,
        {
          ${events}
        }
      );
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts'
    })
  );

  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}';`);

  fs.writeFileSync(componentFile, source, 'utf8');
});

// Generate the index file
fs.writeFileSync(path.join(outdir, 'index.ts'), index.join('\n'), 'utf8');

console.log(chalk.cyan(`\nComponents have been wrapped for React! 📦\n`));
