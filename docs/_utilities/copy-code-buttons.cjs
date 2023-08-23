let codeBlockId = 0;

/**
 * Adds copy code buttons to code fields. The provided doc should be a document object provided by JSDOM. The same
 * document will be returned with the appropriate DOM manipulations.
 */
module.exports = function (doc) {
  doc.querySelectorAll('pre > code').forEach(code => {
    const pre = code.closest('pre');
    const button = doc.createElement('sl-copy-button');

    if (!code.id) {
      code.id = `code-block-${++codeBlockId}`;
    }

    button.classList.add('copy-code-button');
    button.setAttribute('from', code.id);

    pre.append(button);
  });

  return doc;
};
