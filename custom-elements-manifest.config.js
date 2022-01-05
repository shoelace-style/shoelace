import fs from 'fs';
import { parse } from 'comment-parser';
import { pascalCase } from 'pascal-case';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const { name, description, version, author, homepage, license } = packageData;
const noDash = string => string.replace(/^\s?-/, '').trim();

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.test.ts'],
  plugins: [
    // Append package data
    {
      name: 'shoelace-package-data',
      packageLinkPhase({ customElementsManifest, context }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      }
    },

    // Parse custom jsDoc tags
    {
      name: 'shoelace-custom-tags',
      analyzePhase({ ts, node, moduleDoc, context }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration:
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const customTags = ['animation', 'dependency', 'since', 'status'];
            let customComments = '/**';

            node.jsDoc?.forEach(jsDoc => {
              jsDoc?.tags?.forEach(tag => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  customComments += `\n * @${tagName} ${tag.comment}`;
                }
              });
            });

            const parsed = parse(customComments + '\n */');
            parsed[0].tags?.map(t => {
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
                case 'since':
                case 'status':
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
    },

    {
      name: 'shoelace-react-event-names',
      analyzePhase({ ts, node, moduleDoc, context }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration:
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            if (classDoc?.events) {
              classDoc.events.map(event => {
                event.reactName = `on${pascalCase(event.name)}`;
              });
            }
        }
      }
    }
  ]
};
