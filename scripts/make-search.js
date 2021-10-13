import commandLineArgs from 'command-line-args';
import fs from 'fs';
import path from 'path';
import glob from 'globby';
import lunr from 'lunr';
import { getAllComponents } from './shared.js';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));

console.log('Generating search index for documentation');

(async () => {
  function getHeadings(markdown, maxLevel = 6) {
    const headings = [];
    const lines = markdown.split('\n');

    lines.map(line => {
      if (line.startsWith('#')) {
        const level = line.match(/^(#+)/)[0].length;
        const content = line.replace(/^#+/, '');

        if (level <= maxLevel) {
          headings.push({ level, content });
        }
      }
    });

    return headings;
  }

  function getMembers(markdown) {
    const members = [];
    const headers = markdown.match(/\[component-header:([a-z-]+)\]/g);

    if (!headers) {
      return '';
    }

    headers.map(header => {
      const tagName = header.match(/\[component-header:([a-z-]+)\]/)[1];
      const component = getAllComponents(metadata).find(component => component.tagName === tagName);

      if (component) {
        const fields = ['members', 'cssProperties', 'cssParts', 'slots', 'events'];

        fields.map(field => {
          if (component[field]) {
            component[field].map(entry => {
              if (entry.name) members.push(entry.name);
              if (entry.description) members.push(entry.description);
              if (entry.attribute) members.push(entry.attribute);
            });
          }
        });
      }
    });

    return members.join(' ');
  }

  const files = await glob('./docs/**/*.md');
  const map = {};
  const searchIndex = lunr(function () {
    // The search index uses these field names extensively, so shortening them can save some serious bytes. The initial
    // index file went from 468 KB => 401 KB by using single-character names!
    this.ref('id'); // id
    this.field('t', { boost: 10 }); // title
    this.field('h', { boost: 5 }); // headings
    this.field('m', { boost: 2 }); // members (props, methods, events, etc.)
    this.field('c'); // content

    files.map((file, index) => {
      const relativePath = path.relative('./docs', file).replace(/\\/g, '/');
      const relativePathNoExtension = relativePath.split('.').slice(0, -1).join('.');
      const url = relativePath.replace(/\.md$/, '');
      const filename = path.basename(file);
      // Ignore certain directories and files
      if (relativePath.startsWith('assets/') || relativePath.startsWith('dist/') || filename === '_sidebar.md') {
        return false;
      }

      const content = fs.readFileSync(file, 'utf8');
      const allHeadings = getHeadings(content, 4);
      const title = allHeadings.find(heading => heading.level === 1)?.content || '';
      const headings = allHeadings
        .filter(heading => heading.level > 1)
        .map(heading => heading.content)
        .concat([relativePathNoExtension])
        .join(' ');
      const members = getMembers(content);

      this.add({ id: index, t: title, h: headings, m: members, c: content });

      map[index] = { title, url };
    });
  });

  fs.writeFileSync('./docs/search.json', JSON.stringify({ searchIndex, map }), 'utf8');
})();
