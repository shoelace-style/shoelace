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
  'typedoc --json .cache/typedoc.json --entryPoints src/shoelace.ts --exclude "**/*+(index|.spec|.e2e).ts" --excludeExternals --excludeProtected --excludeInternal',
  { stdio: 'inherit' }
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
    const customProperties = tags.filter(item => item.tag === 'customproperty');
    const animations = tags.filter(item => item.tag === 'animation');

    api.since = tags.find(item => item.tag === 'since').text.trim();
    api.status = tags.find(item => item.tag === 'status').text.trim();
    api.dependencies = dependencies.map(tag => tag.text.trim());
    api.slots = slots.map(tag => splitText(tag.text));
    api.parts = parts.map(tag => splitText(tag.text));
    api.cssCustomProperties = customProperties.map(tag => splitText(tag.text));
    api.animations = animations.map(tag => splitText(tag.text));
  } else {
    console.error(chalk.yellow(`Missing comment block for ${component.name} - skipping metadata`));
  }

  // Props
  const props = component.children
    .filter(child => child.kindString === 'Property' && !child.flags.isStatic)
    .filter(child => child.type.name !== 'EventEmitter')
    .filter(child => child.comment && child.comment.shortText); // only with comments

  props.map(prop => {
    const { type, values } = getTypeInfo(prop);
    let attribute;

    // Look for an attribute in the @property decorator
    if (Array.isArray(prop.decorators)) {
      const decorator = prop.decorators.find(d => d.name === 'property');
      if (decorator) {
        try {
          // We trust TypeDoc <3
          const options = eval(`(${decorator.arguments.options})`);

          // If an attribute is specified, it will always be a string
          if (options && typeof options.attribute === 'string') {
            attribute = options.attribute;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    api.props.push({
      name: prop.name,
      attribute: attribute,
      description: prop.comment.shortText,
      type,
      values,
      defaultValue: prop.defaultValue
    });
  });

  // Events
  const events = component.children
    .filter(child => child.kindString === 'Property' && !child.flags.isStatic)
    .filter(child => child.type.name === 'EventEmitter')
    .filter(child => child.comment && child.comment.shortText); // only with comments

  events.map(event => {
    const decorator = event.decorators.filter(dec => dec.name === 'event')[0];
    const name = (decorator ? decorator.arguments.eventName : event.name).replace(/['"`]/g, '');

    // TODO: This logic is used to gather event details in a developer-friendly format. It could be improved as it may
    // not cover all types yet. The output is used to populate the Events table of each component in the docs.
    const params = event.type.typeArguments.map(param => {
      if (param.type === 'intrinsic') {
        return param.name;
      }

      if (param.type === 'literal') {
        return param.value;
      }

      if (param.type === 'reflection') {
        return (
          '{ ' +
          param.declaration.children
            .map(child => {
              // Component exports aren't named, so they appear as "default" in the type data. However, we can use the
              // id to link them to the right class.
              if (child.type.name === 'default') {
                const component = components.find(component => component.id === child.type.id);
                if (component) {
                  child.type.name = component.name;
                } else {
                  child.type.name = 'unknown';
                }
              }

              if (child.type.type === 'intrinsic' || child.type.type === 'reference') {
                return `${child.name}: ${child.type.name}`;
              } else if (child.name) {
                if (child.type.type === 'array') {
                  return `${child.name}: ${child.type.elementType.name}[]`;
                } else {
                  return `${child.name}: ${child.type.elementType.name} (${child.type.type})`;
                }
              } else {
                return child.type.type;
              }
            })
            .join(', ') +
          ' }'
        );
      }

      return '';
    });

    const details = params.join(', ');

    api.events.push({
      name,
      description: event.comment.shortText,
      details
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
            isOptional: param.flags?.isOptional,
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

  metadata.components.push(api);
});

// Generate metadata.json
(async () => {
  const filename = path.join('./dist/metadata.json');
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
