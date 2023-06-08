let count = 1;

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Turns code fields with the :preview suffix into interactive code previews.
 */
module.exports = function (doc, options) {
  options = {
    within: 'body', // the element containing the code fields to convert
    ...options
  };

  const within = doc.querySelector(options.within);
  if (!within) {
    return doc;
  }

  within.querySelectorAll('[class*=":preview"]').forEach(code => {
    const pre = code.closest('pre');
    if (!pre) {
      return;
    }
    const adjacentPre = pre.nextElementSibling?.tagName.toLowerCase() === 'pre' ? pre.nextElementSibling : null;
    const reactCode = adjacentPre?.querySelector('code[class$="react"]');
    const sourceGroupId = `code-preview-source-group-${count}`;
    const isExpanded = code.getAttribute('class').includes(':expanded');
    const noCodePen = code.getAttribute('class').includes(':no-codepen');

    count++;

    const htmlButton = `
      <button type="button"
        title="Show HTML code"
        class="code-preview__button code-preview__button--html"
      >
        HTML
      </button>
    `;

    const reactButton = `
      <button type="button" title="Show React code" class="code-preview__button code-preview__button--react">
        React
      </button>
    `;

    const codePenButton = `
      <button type="button" class="code-preview__button code-preview__button--codepen" title="Edit on CodePen">
        <svg
          width="138"
          height="26"
          viewBox="0 0 138 26"
          fill="none"
          stroke="currentColor"
          stroke-width="2.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z" />
        </svg>
      </button>
    `;

    const codePreview = `
      <div class="code-preview ${isExpanded ? 'code-preview--expanded' : ''}">
        <div class="code-preview__preview">
          ${code.textContent}
          <div class="code-preview__resizer">
            <sl-icon name="grip-vertical"></sl-icon>
          </div>
        </div>

        <div class="code-preview__source-group" id="${sourceGroupId}">
          <div class="code-preview__source code-preview__source--html" ${reactCode ? 'data-flavor="html"' : ''}>
            <pre><code class="language-html">${escapeHtml(code.textContent)}</code></pre>
          </div>

          ${
            reactCode
              ? `
            <div class="code-preview__source code-preview__source--react" data-flavor="react">
              <pre><code class="language-jsx">${escapeHtml(reactCode.textContent)}</code></pre>
            </div>
          `
              : ''
          }
        </div>

        <div class="code-preview__buttons">
          <button
            type="button"
            class="code-preview__button code-preview__toggle"
            aria-expanded="${isExpanded ? 'true' : 'false'}"
            aria-controls="${sourceGroupId}"
          >
            Source
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          ${reactCode ? ` ${htmlButton} ${reactButton} ` : ''}

          ${noCodePen ? '' : codePenButton}
        </div>
      </div>
    `;

    pre.insertAdjacentHTML('afterend', codePreview);
    pre.remove();

    if (adjacentPre) {
      adjacentPre.remove();
    }
  });

  // Wrap code preview scripts in anonymous functions so they don't run in the global scope
  doc.querySelectorAll('.code-preview__preview script').forEach(script => {
    if (script.type === 'module') {
      // Modules are already scoped
      script.textContent = script.innerHTML;
    } else {
      // Wrap non-modules in an anonymous function so they don't run in the global scope
      script.textContent = `(() => { ${script.innerHTML} })();`;
    }
  });

  return doc;
};
