/* eslint-disable no-invalid-this */
import { activeLinksPlugin } from './_utilities/active-links.js';
import { anchorHeadingsPlugin } from './_utilities/anchor-headings.js';
import { capitalCase } from 'change-case';
import { codePreviewsPlugin } from './_utilities/code-previews.js';
import { copyCodeButtonsPlugin } from './_utilities/copy-code-buttons.js';
import { customElementsManifest, getAllComponents } from './_utilities/cem.js';
import { externalLinksPlugin } from './_utilities/external-links.js';
import { highlightCodePlugin } from './_utilities/highlight-code.js';
import { parse } from 'node-html-parser';
// import { prettierPlugin } from './_utilities/prettier.js';
import { replacerPlugin } from './_utilities/replacer.js';
import { scrollingTablesPlugin } from './_utilities/scrolling-tables.js';
import { tableOfContentsPlugin } from './_utilities/table-of-contents.js';
import fs from 'fs';
import lunr from 'lunr';
import path from 'path';
import shoelaceFlavoredMarkdown from './_utilities/markdown.js';

const assetsDir = 'assets';
const cdndir = 'cdn';
const npmdir = 'dist';
const allComponents = getAllComponents();
let hasBuiltSearchIndex = false;

export default function (eleventyConfig) {
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
  // Plugins
  //
  eleventyConfig.addPlugin(
    anchorHeadingsPlugin({
      container: '#content .content__body',
      selector: 'h2, h3, h4, h5'
    })
  );
  eleventyConfig.addPlugin(activeLinksPlugin());
  eleventyConfig.addPlugin(codePreviewsPlugin());
  eleventyConfig.addPlugin(externalLinksPlugin());
  // eleventyConfig.addPlugin(highlightCodePlugin());
  eleventyConfig.addPlugin(
    tableOfContentsPlugin({
      levels: ['h2', 'h3'],
      container: '#content .content__toc > ul',
      within: '#content .content__body'
    })
  );
  eleventyConfig.addPlugin(scrollingTablesPlugin());
  eleventyConfig.addPlugin(copyCodeButtonsPlugin()); // must be after codePreviews + highlightCodeBlocks
  eleventyConfig.addPlugin(
    replacerPlugin([
      { pattern: '%VERSION%', replacement: customElementsManifest.package.version },
      { pattern: '%CDNDIR%', replacement: cdndir },
      { pattern: '%NPMDIR%', replacement: npmdir }
    ])
  );

  //
  // TODO - only run this at build
  //
  // eleventyConfig.addPlugin(prettierPlugin());
  //

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
        const doc = parse(result.content);
        const content = doc.querySelector('#content');
        if (!content) return;

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
}
