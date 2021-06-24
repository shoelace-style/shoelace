//
// This script generates vscode.html-custom-data.json (for IntelliSense).
//
// You must generate dist/custom-elements.json before running this script.
//
import chalk from 'chalk';
import fs from 'fs';
import mkdirp from 'mkdirp';

const metadata = JSON.parse(fs.readFileSync('./dist/custom-elements.json', 'utf8'));

function getAllComponents() {
  const allComponents = [];
  const getComponent = tagName => {
    const module = metadata.modules.find(module => {
      return module.exports.find(ex => {
        return ex.kind === 'custom-element-definition' && ex.name === tagName;
      });
    });

    const component = module?.declarations.find(dec => dec.name === 'default');
    const tag = module.exports.filter(ex => ex.kind === 'custom-element-definition' && ex.name === tagName)[0]?.name;

    return Object.assign({ tag }, component);
  };

  metadata.modules.map(module => {
    module.exports.find(ex => {
      if (ex.kind === 'custom-element-definition') {
        if (typeof ex.name === 'string') {
          allComponents.push(getComponent(ex.name));
        }
      }
    });
  });

  return allComponents;
}

console.log('Generating IntelliSense data for VS Code');

const components = getAllComponents();
const vscode = { tags: [] };

components.map(component => {
  const name = component.tag;
  const attributes = component.attributes?.map(attr => {
    const type = attr.type?.text;
    let values = [];

    if (type) {
      type.split('|').map(val => {
        val = val.trim();

        // Only accept values that are strings and numbers
        const isString = val.startsWith(`'`);
        const isNumber = Number(val).toString() === val;

        if (isString) {
          // Remove quotes
          val = val.replace(/^'/, '').replace(/'$/, '');
        }

        if (isNumber || isString) {
          values.push({ name: val });
        }
      });
    }

    if (values.length === 0) {
      values = undefined;
    }

    return {
      name: attr.name,
      description: attr.description,
      values
    };
  });

  vscode.tags.push({ name, attributes });
});

fs.writeFileSync('./dist/vscode.html-custom-data.json', JSON.stringify(vscode, null, 2), 'utf8');

console.log(chalk.cyan(`Successfully generated IntelliSense data for VS Code 🔮\n`));
