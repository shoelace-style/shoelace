/**
 * Generates an in-page table of contents based on headings.
 */
module.exports = function (doc, options) {
  options = {
    levels: ['h2'], // headings to include (they must have an id)
    container: 'nav', // the container to append links to
    listItem: true, // if true, links will be wrapped in <li>
    within: 'body', // the element containing the headings to summarize
    ...options
  };

  const container = doc.querySelector(options.container);
  const within = doc.querySelector(options.within);
  const headingSelector = options.levels.map(h => `${h}[id]`).join(', ');

  if (!container || !within) {
    return doc;
  }

  within.querySelectorAll(headingSelector).forEach(heading => {
    const listItem = doc.createElement('li');
    const link = doc.createElement('a');
    const level = heading.tagName.slice(1);

    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    if (options.listItem) {
      // List item + link
      listItem.setAttribute('data-level', level);
      listItem.append(link);
      container.append(listItem);
    } else {
      // Link only
      link.setAttribute('data-level', level);
      container.append(link);
    }
  });

  return doc;
};
