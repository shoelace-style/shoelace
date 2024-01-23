import * as path from 'path';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
import { parse } from 'comment-parser';
import { pascalCase } from 'pascal-case';
import commandLineArgs from 'command-line-args';
import fs from 'fs';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const { name, description, version, author, homepage, license } = packageData;

const { outdir } = commandLineArgs([
  { name: 'litelement', type: String },
  { name: 'analyze', defaultOption: true },
  { name: 'outdir', type: String }
]);

function noDash(string) {
  return string.replace(/^\s?-/, '').trim();
}

function replace(string, terms) {
  terms.forEach(({ from, to }) => {
    string = string?.replace(from, to);
  });

  return string;
}

export default {
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/*.styles.ts', '**/*.test.ts'],
  plugins: [
    // Append package data
    {
      name: 'shoelace-package-data',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      }
    },

    // Infer tag names because we no longer use @customElement decorators.
    {
      name: 'shoelace-infer-tag-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            const importPath = moduleDoc.path;

            // This is kind of a best guess at components. "thing.component.ts"
            if (!importPath.endsWith('.component.ts')) {
              return;
            }

            const tagNameWithoutPrefix = path.basename(importPath, '.component.ts');
            const tagName = 'sl-' + tagNameWithoutPrefix;

            classDoc.tagNameWithoutPrefix = tagNameWithoutPrefix;
            classDoc.tagName = tagName;

            // This used to be set to true by @customElement
            classDoc.customElement = true;
          }
        }
      }
    },

    // Parse custom jsDoc tags
    {
      name: 'shoelace-custom-tags',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const customTags = ['animation', 'dependency', 'documentation', 'since', 'status', 'title'];
            let customComments = '/**';

            node.jsDoc?.forEach(jsDoc => {
              jsDoc?.tags?.forEach(tag => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  customComments += `\n * @${tagName} ${tag.comment}`;
                }
              });
            });

            // This is what allows us to map JSDOC comments to ReactWrappers.
            classDoc['jsDoc'] = node.jsDoc?.map(jsDoc => jsDoc.getFullText()).join('\n');

            const parsed = parse(`${customComments}\n */`);
            parsed[0].tags?.forEach(t => {
              switch (t.tag) {
                // Animations
                case 'animation':
                  if (!Array.isArray(classDoc['animations'])) {
                    classDoc['animations'] = [];
                  }
                  classDoc['animations'].push({
                    name: t.name,
                    description: noDash(t.description)
                  });
                  break;

                // Dependencies
                case 'dependency':
                  if (!Array.isArray(classDoc['dependencies'])) {
                    classDoc['dependencies'] = [];
                  }
                  classDoc['dependencies'].push(t.name);
                  break;

                // Value-only metadata tags
                case 'documentation':
                case 'since':
                case 'status':
                case 'title':
                  classDoc[t.tag] = t.name;
                  break;

                // All other tags
                default:
                  if (!Array.isArray(classDoc[t.tag])) {
                    classDoc[t.tag] = [];
                  }

                  classDoc[t.tag].push({
                    name: t.name,
                    description: t.description,
                    type: t.type || undefined
                  });
              }
            });
          }
        }
      }
    },

    {
      name: 'shoelace-react-event-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            if (classDoc?.events) {
              classDoc.events.forEach(event => {
                event.reactName = `on${pascalCase(event.name)}`;
                event.eventName = `${pascalCase(event.name)}Event`;
              });
            }
          }
        }
      }
    },

    {
      name: 'shoelace-translate-module-paths',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest?.modules?.forEach(mod => {
          //
          // CEM paths look like this:
          //
          //  src/components/button/button.ts
          //
          // But we want them to look like this:
          //
          //  components/button/button.js
          //
          const terms = [
            { from: /^src\//, to: '' }, // Strip the src/ prefix
            { from: /\.component.(t|j)sx?$/, to: '.js' } // Convert .ts to .js
          ];

          mod.path = replace(mod.path, terms);

          for (const ex of mod.exports ?? []) {
            ex.declaration.module = replace(ex.declaration.module, terms);
          }

          for (const dec of mod.declarations ?? []) {
            if (dec.kind === 'class') {
              for (const member of dec.members ?? []) {
                if (member.inheritedFrom) {
                  member.inheritedFrom.module = replace(member.inheritedFrom.module, terms);
                }
              }
            }
          }
        });
      }
    },

    // Generate custom VS Code data
    customElementVsCodePlugin({
      outdir,
      cssFileName: null,
      referencesTemplate: (_, tag) => [
        {
          name: 'Documentation',
          url: `https://shoelace.style/components/${tag.replace('sl-', '')}`
        }
      ]
    }),

    customElementJetBrainsPlugin({
      outdir: './dist',
      excludeCss: true,
      packageJson: false,
      referencesTemplate: (_, tag) => {
        return {
          name: 'Documentation',
          url: `https://shoelace.style/components/${tag.replace('sl-', '')}`
        };
      }
    }),

    customElementVuejsPlugin({
      outdir: './dist/types/vue',
      fileName: 'index.d.ts',
      componentTypePath: (_, tag) => `../../components/${tag.replace('sl-', '')}/${tag.replace('sl-', '')}.component.js`
    })
  ]
};
