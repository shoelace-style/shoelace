/**
 * @typedef {object} Replacement
 * @property {string | RegExp} pattern
 * @property {string} replacement
 */

/**
 * @typedef {Array<Replacement>} Replacements
 */

/**
 * @param {String} rawContent
 * @param {Replacements} replacements
 */
module.exports = function (rawContent, replacements) {
  let content = rawContent;
  replacements.forEach(replacement => {
    content = content.replaceAll(replacement.pattern, replacement.replacement);
  });

  return content;
};
