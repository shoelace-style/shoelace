const { createSlug } = require('./strings.cjs');

/**
 * Turns headings into clickable, deep linkable anchors. The provided doc should be a document object provided by JSDOM.
 * The same document will be returned with the appropriate DOM manipulations.
 */
module.exports = function (doc, options) {
  options = {
    levels: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // the headings to convert
    className: 'anchor-heading', // the class name to add
    within: 'body', // the element containing the target headings
    ...options
  };

  const within = doc.querySelector(options.within);

  if (!within) {
    return doc;
  }

  within.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    const hasAnchor = heading.querySelector('a');
    const anchor = doc.createElement('a');
    const slug = createSlug(heading.textContent ?? '') ?? '';
    let id = slug;
    let suffix = 0;

    // If we can't generate a slug, skip this heading
    if (!slug) return;

    // Skip heading levels we don't care about
    if (!options.levels?.includes(heading.tagName.toLowerCase())) {
      return;
    }

    // Ensure the id is unique
    while (doc.getElementById(id) !== null) {
      id = `${slug}-${++suffix}`;
    }

    if (hasAnchor || !id) return;

    heading.setAttribute('id', id);
    anchor.setAttribute('href', `#${encodeURIComponent(id)}`);
    anchor.setAttribute('aria-label', `Direct link to "${heading.textContent}"`);

    if (options.className) {
      heading.classList.add(options.className);
    }

    // Append the anchor
    heading.append(anchor);
  });

  return doc;
};
