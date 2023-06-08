const { isExternalLink } = require('./strings.cjs');

/**
 * Transforms external links to make them safer and optionally add a target. The provided doc should be a document
 * object provided by JSDOM. The same document will be returned with the appropriate DOM manipulations.
 */
module.exports = function (doc, options) {
  options = {
    className: 'external-link', // the class name to add to links
    noopener: true, // sets rel="noopener"
    noreferrer: true, // sets rel="noreferrer"
    ignore: () => false, // callback function to filter links that should be ignored
    within: 'body', // element that contains the target links
    target: '', // sets the target attribute
    ...options
  };

  const within = doc.querySelector(options.within);

  if (within) {
    within.querySelectorAll('a').forEach(link => {
      if (isExternalLink(link) && !options.ignore(link)) {
        link.classList.add(options.className);

        const rel = [];
        if (options.noopener) rel.push('noopener');
        if (options.noreferrer) rel.push('noreferrer');

        if (rel.length) {
          link.setAttribute('rel', rel.join(' '));
        }

        if (options.target) {
          link.setAttribute('target', options.target);
        }
      }
    });
  }

  return doc;
};
