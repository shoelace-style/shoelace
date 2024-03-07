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
export function replacerPlugin(replacements) {
  return function (eleventyConfig) {
    eleventyConfig.addTransform('replacer', content => {
      replacements.forEach(replacement => {
        content = content.replaceAll(replacement.pattern, replacement.replacement);
      });

      return content;
    });
  };
}
