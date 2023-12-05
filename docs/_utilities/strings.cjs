const slugify = require('slugify');

/** Creates a slug from an arbitrary string of text. */
module.exports.createSlug = function (text) {
  return slugify(String(text), {
    remove: /[^\w|\s]/g,
    lower: true
  });
};

/** Determines whether or not a link is external. */
module.exports.isExternalLink = function (link) {
  // We use the "internal" hostname when initializing JSDOM so we know that those are local links
  if (!link.hostname || link.hostname === 'internal') return false;
  return true;
};
