//
// This script runs TypeDoc and uses its output to generate metadata files used by the docs
//
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const package = require('../package.json');
const { parse } = require('comment-parser/lib');

function getTagName(className) {
  return className.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');
}

// Takes a prop or param and returns type info as a string and, if applicable, an array of possible values
function getTypeInfo(item) {
  const values = [];
  let type = item.type.name || '';

  if (item.type.type === 'union') {
    const types = item.type.types.map(t => {
      if (t.type === 'literal' || t.type === 'reference') {
        values.push(t.value);
        type = `'${item.type.types.map(t => t.value).join(`' | '`)}'`;
      }

      if (t.type === 'intrinsic') {
        values.push(t.name);
        type = item.type.types.map(t => t.name).join(' | ');
      }
    });
  }

  return {
    type,
    values: values.length ? values : undefined
  };
}

// Splits a string of tag text into a { name, description } object
function splitText(text) {
  const shouldSplit = text.indexOf(' - ') > -1;
  let name = '';
  let description = '';

  if (shouldSplit) {
    const split = text.split(' - ');
    name = split[0].trim();
    description = split.slice(1).join(' - ').replace(/^- /, '');
  } else {
    description = text.trim().replace(/^-\s/, '');
  }

  return { name, description };
}

// Run typedoc
console.log(chalk.cyan('Generating type data with TypeDoc'));
mkdirp.sync('./.cache');
execSync(
  'typedoc --json .cache/typedoc.json --entryPoints src/shoelace.ts --exclude "**/*+(index|.spec|.e2e).ts" --excludeExternals --excludeProtected --excludeInternal'
);

const data = JSON.parse(fs.readFileSync('.cache/typedoc.json', 'utf8'));
const modules = data.children;
const components = modules.filter(module => module.kindString === 'Class');
const metadata = {
  name: package.name,
  description: package.description,
  version: package.version,
  author: package.author,
  homepage: package.homepage,
  license: package.license,
  components: []
};

components.map(async component => {
  const api = {
    className: component.name,
    tag: getTagName(component.name),
    file: component.sources[0].fileName,
    since: '',
    status: '',
    props: [],
    methods: [],
    events: [],
    slots: [],
    cssCustomProperties: [],
    parts: [],
    dependencies: []
  };

  // Metadata
  if (component.comment) {
    const tags = component.comment.tags;
    const dependencies = tags.filter(item => item.tag === 'dependency');
    const slots = tags.filter(item => item.tag === 'slot');
    const parts = tags.filter(item => item.tag === 'part');
    const events = tags.filter(item => item.tag === 'emit');

    api.since = tags.find(item => item.tag === 'since').text.trim();
    api.status = tags.find(item => item.tag === 'status').text.trim();
    api.dependencies = dependencies.map(tag => tag.text.trim());
    api.slots = slots.map(tag => splitText(tag.text));
    api.parts = parts.map(tag => splitText(tag.text));
    api.events = events.map(tag => splitText(tag.text));
  } else {
    console.error(chalk.yellow(`Missing comment block for ${component.name} - skipping metadata`));
  }

  // Props
  const props = component.children
    .filter(child => child.kindString === 'Property' && !child.flags.isStatic)
    .filter(child => child.comment && child.comment.shortText); // only with comments

  props.map(prop => {
    const { type, values } = getTypeInfo(prop);

    api.props.push({
      name: prop.name,
      description: prop.comment.shortText,
      type,
      values,
      defaultValue: prop.defaultValue
    });
  });

  // Methods
  const methods = component.children
    .filter(child => child.kindString === 'Method' && !child.flags.isStatic)
    .filter(child => child.signatures[0].comment && child.signatures[0].comment.shortText); // only with comments

  methods.map(method => {
    const signature = method.signatures[0];
    const params = Array.isArray(signature.parameters)
      ? signature.parameters.map(param => {
          const { type, values } = getTypeInfo(param);
          return {
            name: param.name,
            type,
            values,
            defaultValue: param.defaultValue
          };
        })
      : [];

    api.methods.push({
      name: method.name,
      description: signature.comment.shortText,
      params
    });
  });

  // CSS custom properties
  const stylesheet = path.resolve(path.dirname(api.file), path.parse(api.file).name + '.scss');
  if (fs.existsSync(stylesheet)) {
    const styles = fs.readFileSync(stylesheet, 'utf8');
    const parsed = parse(styles);
    const tags = parsed[0] ? parsed[0].tags : [];
    const cssCustomProperties = tags
      .filter(tag => tag.tag === 'prop')
      .map(tag => api.cssCustomProperties.push({ name: tag.tag, description: tag.description }));
  }

  metadata.components.push(api);
});

// Generate components.json
(async () => {
  const filename = path.join('./dist/components.json');
  const json = JSON.stringify(metadata, null, 2);

  await mkdirp(path.dirname(filename));
  fs.writeFileSync(filename, json, 'utf8');
})();

// Generate vscode.html-custom-data.json (for IntelliSense)
(async () => {
  const filename = path.join('./dist/vscode.html-custom-data.json');
  const customData = {
    tags: metadata.components.map(component => ({
      name: component.tag,
      description: component.description,
      attributes: component.props.map(prop => ({
        name: prop.name,
        description: prop.description,
        values: prop.values ? prop.values.map(value => ({ name: value })) : undefined
      }))
    }))
  };
  const json = JSON.stringify(customData, null, 2);

  await mkdirp(path.dirname(filename));
  fs.writeFileSync(filename, json, 'utf8');
})();

console.log(chalk.green(`Successfully generated metadata 🏷\n`));
