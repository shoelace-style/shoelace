/**
 * @typedef {object} Replacement
 * @property {string | RegExp} pattern
 * @property {string} replacement
 */

/**
 * @typedef {Array<Replacement>} Replacements
 */

/**
 * @param {Document} content
 * @param {Replacements} replacements
 */
module.exports = function (content, replacements) {
  replacements.forEach(replacement => {
    content.body.innerHTML = content.body.innerHTML.replaceAll(replacement.pattern, replacement.replacement);
  });
};
