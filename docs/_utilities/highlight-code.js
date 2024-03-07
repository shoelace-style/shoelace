import { parse } from 'node-html-parser';
import Prism from 'prismjs';
import PrismLoader from 'prismjs/components/index.js';

PrismLoader('diff');
PrismLoader.silent = true;

/**
 * Highlights a string of code using the specified language.
 *
 * @param {string} code - The code to highlight.
 * @param {string} language - The language the code is written in. For available languages, refer to this page:
 *   https://prismjs.com/#supported-languages
 */
export function highlightCode(code, language = 'plain') {
  const alias = language.replace(/^diff-/, '');
  const isDiff = /^diff-/i.test(language);

  if (!Prism.languages[alias]) {
    PrismLoader(alias);
    if (!Prism.languages[alias]) {
      throw new Error(`Unsupported language for code highlighting: "${language}"`);
    }
  }

  if (isDiff) {
    Prism.languages[language] = Prism.languages.diff;
  }

  return Prism.highlight(code, Prism.languages[language], language);
}

/**
 * Eleventy plugin to highlight code blocks with the `language-*` attribute using Prism.js. Unlike most plugins, this
 * works on the entire document — not just markdown content.
 */
export function highlightCodePlugin(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('highlight-code', content => {
      const doc = parse(content, { blockTextElements: { code: true } });
      const container = doc.querySelector(options.container);

      if (!container) {
        return content;
      }

      // Look for <code class="language-*"> and highlight each one
      container.querySelectorAll('code[class*="language-"]').forEach(code => {
        const langClass = [...code.classList.values()].find(val => val.startsWith('language-'));
        const lang = langClass ? langClass.replace(/^language-/, '').split(':')[0] : 'plain';

        try {
          code.innerHTML = highlightCode(code.textContent ?? '', lang);
        } catch (err) {
          if (!options.ignoreMissingLangs) {
            throw new Error(err.message);
          }
        }
      });

      return doc.toString();
    });
  };
}
