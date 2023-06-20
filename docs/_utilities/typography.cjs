const smartquotes = require('smartquotes');

smartquotes.replacements.push([/---/g, '\u2014']); // em dash
smartquotes.replacements.push([/--/g, '\u2013']); // en dash
smartquotes.replacements.push([/\.\.\./g, '\u2026']); // ellipsis
smartquotes.replacements.push([/\(c\)/gi, '\u00A9']); // copyright
smartquotes.replacements.push([/\(r\)/gi, '\u00AE']); // registered trademark
smartquotes.replacements.push([/\?!/g, '\u2048']); // ?!
smartquotes.replacements.push([/!!/g, '\u203C']); // !!
smartquotes.replacements.push([/\?\?/g, '\u2047']); // ??
smartquotes.replacements.push([/([0-9]\s?)-(\s?[0-9])/g, '$1\u2013$2']); // number ranges use en dash

/**
 * Improves typography by adding smart quotes and similar corrections within the specified element(s).
 *
 * The provided doc should be a document object provided by JSDOM. The same document will be returned with the
 * appropriate DOM manipulations.
 */
module.exports = function (doc, selector = 'body') {
  const elements = [...doc.querySelectorAll(selector)];
  elements.forEach(el => smartquotes.element(el));
  return doc;
};
