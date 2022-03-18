export default function (plop) {
  plop.setHelper('tagWithoutPrefix', tag => tag.replace(/^sl-/, ''));

  plop.setHelper('tagToTitle', tag => {
    const withoutPrefix = plop.getHelper('tagWithoutPrefix');
    const titleCase = plop.getHelper('titleCase');
    return titleCase(withoutPrefix(tag).replace(/-/g, ' '));
  });

  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'tag',
        message: 'Tag name? (e.g. sl-button)',
        validate: value => {
          // Start with sl- and include only a-z + dashes
          if (!/^sl-[a-z-+]+/.test(value)) {
            return false;
          }

          // No double dashes or ending dash
          if (value.includes('--') || value.endsWith('-')) {
            return false;
          }

          return true;
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.ts',
        templateFile: 'templates/component/component.hbs'
      },
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.styles.ts',
        templateFile: 'templates/component/styles.hbs'
      },
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.test.ts',
        templateFile: 'templates/component/tests.hbs'
      },
      {
        type: 'add',
        path: '../../docs/components/{{ tagWithoutPrefix tag }}.md',
        templateFile: 'templates/component/docs.hbs'
      },
      {
        type: 'modify',
        path: '../../docs/_sidebar.md',
        pattern: /<!--plop:component-->/,
        template: `- [{{ tagToTitle tag }}](/components/{{ tagWithoutPrefix tag }})\n  <!--plop:component-->`
      },
      {
        type: 'modify',
        path: '../../src/shoelace.ts',
        pattern: /\/\* plop:component \*\//,
        template: `export { default as {{ properCase tag }} } from './components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}';\n/* plop:component */`
      }
    ]
  });
}
