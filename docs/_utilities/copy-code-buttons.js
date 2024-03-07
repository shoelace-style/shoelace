import { parse } from 'node-html-parser';

let codeBlockId = 0;

/**
 * Adds copy code buttons to code fields. The provided doc should be a document object provided by JSDOM. The same
 * document will be returned with the appropriate DOM manipulations.
 */

export function copyCodeButtonsPlugin() {
  return function (eleventyConfig) {
    eleventyConfig.addTransform('copy-code-buttons', content => {
      const doc = parse(content);

      doc.querySelectorAll('pre > code').forEach(code => {
        const pre = code.closest('pre');
        const button = parse('<sl-copy-button></sl-copy-button>').firstChild;

        if (!code.id) {
          code.id = `code-block-${++codeBlockId}`;
        }

        button.classList.add('copy-code-button');
        button.setAttribute('from', code.id);

        pre.appendChild(button);
      });

      return doc.toString();
    });
  };
}
