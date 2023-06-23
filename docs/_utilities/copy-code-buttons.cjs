/**
 * Adds copy code buttons to code fields. The provided doc should be a document object provided by JSDOM. The same
 * document will be returned with the appropriate DOM manipulations.
 */
module.exports = function (doc) {
  doc.querySelectorAll('pre > code').forEach(code => {
    const pre = code.closest('pre');
    const button = doc.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('copy-code-button');
    button.setAttribute('aria-label', 'Copy');
    button.innerHTML = `
      <svg class="copy-code-button__copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16" part="svg">
        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"></path>
      </svg>

      <svg class="copy-code-button__copied-icon" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16" part="svg">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
      </svg>
    `;

    pre.append(button);
  });

  return doc;
};
