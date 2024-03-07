import { parse } from 'node-html-parser';

/**
 * Turns headings into clickable, deep linkable anchors. The provided doc should be a document object provided by JSDOM.
 * The same document will be returned with the appropriate DOM manipulations.
 */
export function scrollingTablesPlugin(options) {
  return function (eleventyConfig) {
    eleventyConfig.addTransform('scrolling-tables', content => {
      const doc = parse(content);
      const tables = [...doc.querySelectorAll('table')];

      options = {
        className: 'table-scroll', // the class name to add to the table's container
        ...options
      };

      tables.forEach(table => {
        const div = parse('<div></div>').firstChild;
        div.classList.add(options.className);
        table.insertAdjacentHTML('beforebegin', div);
        div.appendChild(table);
      });

      return doc.toString();
    });
  };
}
