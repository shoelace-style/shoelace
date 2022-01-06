import chalk from 'chalk';
import fs from 'fs';
import del from 'del';
import path from 'path';
import { pascalCase } from 'pascal-case';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.cjs';
import { getAllComponents } from './shared.js';

const outdir = path.join('./src/react');

// Clear build directory
del.sync(outdir);
fs.mkdirSync(outdir, { recursive: true });

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

  fs.mkdirSync(componentDir, { recursive: true });

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
