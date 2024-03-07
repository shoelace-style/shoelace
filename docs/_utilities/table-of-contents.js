import { parse } from 'node-html-parser';

/**
 * Generates an in-page table of contents based on headings.
 */
export function tableOfContentsPlugin(options) {
  options = {
    levels: ['h2'], // headings to include (they must have an id)
    container: 'nav', // the container to append links to
    listItem: true, // if true, links will be wrapped in <li>
    within: 'body', // the element containing the headings to summarize
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('table-of-contents', content => {
      const doc = parse(content);
      const container = doc.querySelector(options.container);
      const within = doc.querySelector(options.within);
      const headingSelector = options.levels.map(h => `${h}[id]`).join(', ');

      if (!container || !within) {
        return doc;
      }

      within.querySelectorAll(headingSelector).forEach(heading => {
        const listItem = parse('<li></li>').firstChild;
        const link = parse('<a></a>').firstChild;
        const level = heading.tagName.slice(1);

        link.setAttribute('href', `#${heading.id}`);
        link.textContent = heading.textContent;

        if (options.listItem) {
          // List item + link
          listItem.setAttribute('data-level', level);
          listItem.appendChild(link);
          container.appendChild(listItem);
        } else {
          // Link only
          link.setAttribute('data-level', level);
          container.appendChild(link);
        }
      });

      return doc.toString();
    });
  };
}
