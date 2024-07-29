/* eslint-disable no-invalid-this */
const fs = require('fs');
const path = require('path');
const lunr = require('lunr');
const { capitalCase } = require('change-case');
const { JSDOM } = require('jsdom');
const { customElementsManifest, getAllComponents } = require('./_utilities/cem.cjs');
const shoelaceFlavoredMarkdown = require('./_utilities/markdown.cjs');
const activeLinks = require('./_utilities/active-links.cjs');
const anchorHeadings = require('./_utilities/anchor-headings.cjs');
const codePreviews = require('./_utilities/code-previews.cjs');
const copyCodeButtons = require('./_utilities/copy-code-buttons.cjs');
const externalLinks = require('./_utilities/external-links.cjs');
const highlightCodeBlocks = require('./_utilities/highlight-code.cjs');
const tableOfContents = require('./_utilities/table-of-contents.cjs');
const prettier = require('./_utilities/prettier.cjs');
const scrollingTables = require('./_utilities/scrolling-tables.cjs');
const typography = require('./_utilities/typography.cjs');
const replacer = require('./_utilities/replacer.cjs');

const assetsDir = 'assets';
const cdndir = 'cdn';
const npmdir = 'dist';
const allComponents = getAllComponents();
let hasBuiltSearchIndex = false;

module.exports = function (eleventyConfig) {
  //
  // Global data
  //
  eleventyConfig.addGlobalData('baseUrl', 'https://shoelace.style/'); // the production URL
  eleventyConfig.addGlobalData('layout', 'default'); // make 'default' the default layout
  eleventyConfig.addGlobalData('toc', true); // enable the table of contents
  eleventyConfig.addGlobalData('meta', {
    title: 'Shoelace',
    description: 'A forward-thinking library of web components.',
    image: 'images/og-image.png',
    version: customElementsManifest.package.version,
    components: allComponents,
    cdndir,
    npmdir
  });

  //
  // Layout aliases
  //
  eleventyConfig.addLayoutAlias('default', 'default.njk');

  //
  // Copy assets
  //
  eleventyConfig.addPassthroughCopy(assetsDir);
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough'); // emulates passthrough copy during --serve

  //
  // Functions
  //

  // Generates a URL relative to the site's root
  eleventyConfig.addNunjucksGlobal('rootUrl', (value = '', absolute = false) => {
    value = path.join('/', value);
    return absolute ? new URL(value, eleventyConfig.globalData.baseUrl).toString() : value;
  });

  // Generates a URL relative to the site's asset directory
  eleventyConfig.addNunjucksGlobal('assetUrl', (value = '', absolute = false) => {
    value = path.join(`/${assetsDir}`, value);
    return absolute ? new URL(value, eleventyConfig.globalData.baseUrl).toString() : value;
  });

  // Fetches a specific component's metadata
  eleventyConfig.addNunjucksGlobal('getComponent', tagName => {
    const component = allComponents.find(c => c.tagName === tagName);
    if (!component) {
      throw new Error(
        `Unable to find a component called "${tagName}". Make sure the file name is the same as the component's tag ` +
          `name (minus the sl- prefix).`
      );
    }
    return component;
  });

  //
  // Custom markdown syntaxes
  //
  eleventyConfig.setLibrary('md', shoelaceFlavoredMarkdown);

  //
  // Filters
  //
  eleventyConfig.addFilter('markdown', content => {
    return shoelaceFlavoredMarkdown.render(content);
  });

  eleventyConfig.addFilter('markdownInline', content => {
    return shoelaceFlavoredMarkdown.renderInline(content);
  });

  // Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
  // With Prettier 3, this means a leading pipe will exist if the line wraps.
  eleventyConfig.addFilter('trimPipes', content => {
    return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
  });

  eleventyConfig.addFilter('classNameToComponentName', className => {
    let name = capitalCase(className.replace(/^Sl/, ''));
    if (name === 'Qr Code') name = 'QR Code'; // manual override
    return name;
  });

  eleventyConfig.addFilter('removeSlPrefix', tagName => {
    return tagName.replace(/^sl-/, '');
  });

  //
  // Transforms
  //
  eleventyConfig.addTransform('html-transform', function (rawContent) {
    let content = replacer(rawContent, [
      { pattern: '%VERSION%', replacement: customElementsManifest.package.version },
      { pattern: '%CDNDIR%', replacement: cdndir },
      { pattern: '%NPMDIR%', replacement: npmdir }
    ]);

    // Parse the template and get a Document object
    const doc = new JSDOM(content, {
      // We must set a default URL so links are parsed with a hostname. Let's use a bogus TLD so we can easily
      // identify which ones are internal and which ones are external.
      url: `https://internal/`
    }).window.document;

    // DOM transforms
    activeLinks(doc, { pathname: this.page.url });
    anchorHeadings(doc, {
      within: '#content .content__body',
      levels: ['h2', 'h3', 'h4', 'h5']
    });
    tableOfContents(doc, {
      levels: ['h2', 'h3'],
      container: '#content .content__toc > ul',
      within: '#content .content__body'
    });
    codePreviews(doc);
    externalLinks(doc, { target: '_blank' });
    highlightCodeBlocks(doc);
    scrollingTables(doc);
    copyCodeButtons(doc); // must be after codePreviews + highlightCodeBlocks
    typography(doc, '#content');

    // Serialize the Document object to an HTML string and prepend the doctype
    content = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;

    // String transforms
    content = prettier(content);

    return content;
  });

  //
  // Build a search index
  //
  eleventyConfig.on('eleventy.after', ({ results }) => {
    // We only want to build the search index on the first run so all pages get indexed.
    if (hasBuiltSearchIndex) {
      return;
    }

    const map = {};
    const searchIndexFilename = path.join(eleventyConfig.dir.output, assetsDir, 'search.json');
    const lunrInput = path.resolve('../node_modules/lunr/lunr.min.js');
    const lunrOutput = path.join(eleventyConfig.dir.output, assetsDir, 'scripts/lunr.js');
    const searchIndex = lunr(function () {
      // The search index uses these field names extensively, so shortening them can save some serious bytes. The
      // initial index file went from 468 KB => 401 KB by using single-character names!
      this.ref('id'); // id
      this.field('t', { boost: 50 }); // title
      this.field('h', { boost: 25 }); // headings
      this.field('c'); // content

      results.forEach((result, index) => {
        const url = path
          .join('/', path.relative(eleventyConfig.dir.output, result.outputPath))
          .replace(/\\/g, '/') // convert backslashes to forward slashes
          .replace(/\/index.html$/, '/'); // convert trailing /index.html to /
        const doc = new JSDOM(result.content, {
          // We must set a default URL so links are parsed with a hostname. Let's use a bogus TLD so we can easily
          // identify which ones are internal and which ones are external.
          url: `https://internal/`
        }).window.document;
        const content = doc.querySelector('#content');

        // Get title and headings
        const title = (doc.querySelector('title')?.textContent || path.basename(result.outputPath)).trim();
        const headings = [...content.querySelectorAll('h1, h2, h3, h4')]
          .map(heading => heading.textContent)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        // Remove code blocks and whitespace from content
        [...content.querySelectorAll('code[class|=language]')].forEach(code => code.remove());
        const textContent = content.textContent.replace(/\s+/g, ' ').trim();

        // Update the index and map
        this.add({ id: index, t: title, h: headings, c: textContent });
        map[index] = { title, url };
      });
    });

    // Copy the Lunr search client and write the index
    fs.mkdirSync(path.dirname(lunrOutput), { recursive: true });
    fs.copyFileSync(lunrInput, lunrOutput);
    fs.writeFileSync(searchIndexFilename, JSON.stringify({ searchIndex, map }), 'utf-8');

    hasBuiltSearchIndex = true;
  });

  //
  // Send a signal to stdout that let's the build know we've reached this point
  //
  eleventyConfig.on('eleventy.after', () => {
    console.log('[eleventy.after]');
  });

  //
  // Dev server options (see https://www.11ty.dev/docs/dev-server/#options)
  //
  eleventyConfig.setServerOptions({
    domDiff: false, // disable dom diffing so custom elements don't break on reload,
    port: 4000, // if port 4000 is taken, 11ty will use the next one available
    watch: ['cdn/**/*'] // additional files to watch that will trigger server updates (array of paths or globs)
  });

  //
  // 11ty config
  //
  return {
    dir: {
      input: 'pages',
      output: '../_site',
      includes: '../_includes' // resolved relative to the input dir
    },
    markdownTemplateEngine: 'njk', // use Nunjucks instead of Liquid for markdown files
    templateEngineOverride: ['njk'] // just Nunjucks and then markdown
  };
};
