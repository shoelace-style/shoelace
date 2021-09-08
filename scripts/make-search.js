import fs from 'fs';
import path from 'path';
import glob from 'globby';
import lunr from 'lunr';

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

  const files = await glob('./docs/**/*.md');
  const map = {};
  const searchIndex = lunr(function () {
    // The search index uses these field names extensively, so shortening them can save some serious bytes. The initial
    // index file went from 468 KB => 401 KB by using single-character names!
    this.ref('id'); // id
    this.field('t', { boost: 10 }); // title
    this.field('h', { boost: 5 }); // headings
    this.field('c'); // content

    files.map((file, index) => {
      const relativePath = path.relative('./docs', file).replace(/\\/g, '/');
      const url = relativePath.replace(/\.md$/, '');
      const filename = path.basename(file);

      // Ignore certain directories and files
      if (relativePath.startsWith('assets/') || relativePath.startsWith('dist/') || filename === '_sidebar.md') {
        return false;
      }

      const content = fs.readFileSync(file, 'utf8');
      const allHeadings = getHeadings(content, 4);
      const title =
        allHeadings.find(heading => heading.level === 1)?.content ||
        path.basename(path.basename(filename), path.extname(filename));
      const headings = allHeadings
        .filter(heading => heading.level > 1)
        .map(heading => heading.content)
        .join('\n');

      this.add({ id: index, t: title, h: headings, c: content });

      map[index] = { title, url };
    });
  });

  fs.writeFileSync('./docs/search.json', JSON.stringify({ searchIndex, map }), 'utf8');
})();
