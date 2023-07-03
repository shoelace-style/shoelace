import commandLineArgs from 'command-line-args';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { deleteSync } from 'del';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.cjs';
import { getAllComponents } from './shared.js';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

const reactDir = path.join('./src/react');

// Clear build directory
deleteSync(reactDir);
fs.mkdirSync(reactDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);
const index = [];

components.map(component => {
  const tagWithoutPrefix = component.tagName.replace(/^sl-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = component.path;
  const eventImports = (component.events || [])
    .map(event => `import { ${event.eventName} } from '../../../src/events/events';`)
    .join('\n');
  const eventNameImport =
    (component.events || []).length > 0 ? `import { type EventName  } from '@lit-labs/react';` : ``;
  const events = (component.events || [])
    .map(event => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
    .join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const source = prettier.format(
    `
      import * as React from 'react';
      import { createComponent } from '@lit-labs/react';
      import Component from '../../${importPath}';

      ${eventNameImport}
      ${eventImports}

      export default createComponent({
        tagName: '${component.tagName}',
        elementClass: Component,
        react: React,
        events: {
          ${events}
        }
      });
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts'
    })
  );

  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}/index.js';`);

  fs.writeFileSync(componentFile, source, 'utf8');
});

// Generate the index file
fs.writeFileSync(path.join(reactDir, 'index.ts'), index.join('\n'), 'utf8');
