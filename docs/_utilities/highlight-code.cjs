const Prism = require('prismjs');
const PrismLoader = require('prismjs/components/index.js');

PrismLoader('diff');
PrismLoader.silent = true;

/** Highlights a code string. */
function highlight(code, language) {
  const alias = language.replace(/^diff-/, '');
  const isDiff = /^diff-/i.test(language);

  // Auto-load the target language
  if (!Prism.languages[alias]) {
    PrismLoader(alias);

    if (!Prism.languages[alias]) {
      throw new Error(`Unsupported language for code highlighting: "${language}"`);
    }
  }

  // Register diff-* languages to use the diff grammar
  if (isDiff) {
    Prism.languages[language] = Prism.languages.diff;
  }

  return Prism.highlight(code, Prism.languages[language], language);
}

/**
 * Highlights all code fields that have a language parameter. If the language has a colon in its name, the first chunk
 * will be the language used and additional chunks will be applied as classes to the `<pre>`. For example, a code field
 * tagged with "html:preview" will be rendered as `<pre class="language-html preview">`.
 *
 * The provided doc should be a document object provided by JSDOM. The same document will be returned with the
 * appropriate DOM manipulations.
 */
module.exports = function (doc) {
  doc.querySelectorAll('pre > code[class]').forEach(code => {
    // Look for class="language-*" and split colons into separate classes
    code.classList.forEach(className => {
      if (className.startsWith('language-')) {
        //
        // We use certain suffixes to indicate code previews, expanded states, etc. The class might look something like
        // this:
        //
        //  class="language-html:preview:expanded"
        //
        // The language will always come first, so we need to drop the "language-" prefix and everything after the first
        // color to get the highlighter language.
        //
        const language = className.replace(/^language-/, '').split(':')[0];

        try {
          code.innerHTML = highlight(code.textContent ?? '', language);
        } catch (err) {
          // Language not found, skip it
        }
      }
    });
  });

  return doc;
};
