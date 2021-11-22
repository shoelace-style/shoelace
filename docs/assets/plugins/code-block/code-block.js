(() => {
  const reactVersion = '17.0.2';
  let flavor = getFlavor();
  let count = 1;

  // Sync flavor UI on page load
  setFlavor(getFlavor());

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  function convertModuleLinks(html) {
    const version = sessionStorage.getItem('sl-version');

    html = html
      .replace(/@shoelace-style\/shoelace/g, `https://cdn.skypack.dev/@shoelace-style/shoelace@${version}`)
      .replace(/from 'react'/g, `from 'https://cdn.skypack.dev/react@${reactVersion}'`)
      .replace(/from "react"/g, `from "https://cdn.skypack.dev/react@${reactVersion}"`);

    return html;
  }

  function getAdjacentExample(name, pre) {
    let currentPre = pre.nextElementSibling;

    while (currentPre?.tagName.toLowerCase() === 'pre') {
      if (currentPre?.getAttribute('data-lang').split(' ').includes(name)) {
        return currentPre;
      }

      currentPre = currentPre.nextElementSibling;
    }

    return null;
  }

  function runScript(script) {
    const newScript = document.createElement('script');

    if (script.type === 'module') {
      newScript.type = 'module';
      newScript.textContent = script.innerHTML;
    } else {
      newScript.appendChild(document.createTextNode(`(() => { ${script.innerHTML} })();`));
    }

    script.parentNode.replaceChild(newScript, script);
  }

  function getFlavor() {
    return localStorage.getItem('flavor') || 'html';
  }

  function setFlavor(newFlavor) {
    flavor = ['html', 'react'].includes(newFlavor) ? newFlavor : 'html';
    localStorage.setItem('flavor', flavor);

    // Set the flavor class on the body
    document.body.classList.toggle('flavor-html', flavor === 'html');
    document.body.classList.toggle('flavor-react', flavor === 'react');
  }

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  window.$docsify.plugins.push((hook, vm) => {
    // Convert code blocks to previews
    hook.afterEach(function (html, next) {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(html, 'text/html');

      const htmlButton = `
        <button
          type="button"
          title="Show HTML code"
          class="code-block__button code-block__button--html ${flavor === 'html' ? 'code-block__button--selected' : ''}"
        >
          HTML
        </button>
      `;

      const reactButton = `
        <button
          type="button"
          title="Show React code"
          class="code-block__button code-block__button--react ${
            flavor === 'react' ? 'code-block__button--selected' : ''
          }"
        >
          React
        </button>
      `;

      const codePenButton = `
        <button type="button" class="code-block__button code-block__button--codepen" title="Edit on CodePen">
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

      [...doc.querySelectorAll('code[class^="lang-"]')].map(code => {
        if (code.classList.contains('preview')) {
          const isExpanded = code.classList.contains('expanded');
          const pre = code.closest('pre');
          const sourceGroupId = `code-block-source-group-${count}`;
          const toggleId = `code-block-toggle-${count}`;
          const reactPre = getAdjacentExample('react', pre);
          const hasReact = reactPre !== null;
          const examples = [
            {
              name: 'HTML',
              codeBlock: pre
            }
          ];

          pre.setAttribute('data-lang', pre.getAttribute('data-lang').replace(/ preview$/, ''));
          pre.setAttribute('aria-labelledby', toggleId);

          const codeBlock = `
            <div class="code-block ${isExpanded ? 'code-block--expanded' : ''}">
              <div class="code-block__preview">
                ${code.textContent}
                <div class="code-block__resizer">
                  <sl-icon name="grip-vertical"></sl-icon>
                </div>
              </div>

              <div class="code-block__source-group" id="${sourceGroupId}">
                <div class="code-block__source code-block__source--html" ${hasReact ? 'data-flavor="html"' : ''}>
                  ${pre.outerHTML}
                </div>

                ${
                  hasReact
                    ? `
                  <div class="code-block__source code-block__source--react" data-flavor="react">
                    ${reactPre.outerHTML}
                  </div>
                `
                    : ''
                }
              </div>

              <div class="code-block__buttons">
                ${hasReact ? ` ${htmlButton} ${reactButton} ` : ''}

                <button
                  type="button"
                  class="code-block__button code-block__toggle"
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

                ${!code.classList.contains('no-codepen') ? codePenButton : ''}
              </div>
            </div>
          `;

          pre.replaceWith(domParser.parseFromString(codeBlock, 'text/html').body);
          if (reactPre) reactPre.remove();

          count++;
        }
      });

      // Force the highlighter to run again so JSX fields get highlighted properly
      requestAnimationFrame(() => Prism.highlightAll());

      next(doc.body.innerHTML);
    });

    // After the page is done loading, force scripts in previews to execute
    hook.doneEach(() => {
      [...document.querySelectorAll('.code-block__preview script')].map(script => runScript(script));
    });

    // Horizontal resizing
    hook.doneEach(() => {
      [...document.querySelectorAll('.code-block__preview')].map(preview => {
        const resizer = preview.querySelector('.code-block__resizer');
        let startX;
        let startWidth;

        const dragStart = event => {
          startX = event.changedTouches ? event.changedTouches[0].pageX : event.clientX;
          startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10);
          preview.classList.add('code-block__preview--dragging');
          event.preventDefault();
          document.documentElement.addEventListener('mousemove', dragMove, false);
          document.documentElement.addEventListener('touchmove', dragMove, false);
          document.documentElement.addEventListener('mouseup', dragStop, false);
          document.documentElement.addEventListener('touchend', dragStop, false);
        };

        const dragMove = event => {
          setWidth(startWidth + (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - startX);
        };

        const dragStop = event => {
          preview.classList.remove('code-block__preview--dragging');
          document.documentElement.removeEventListener('mousemove', dragMove, false);
          document.documentElement.removeEventListener('touchmove', dragMove, false);
          document.documentElement.removeEventListener('mouseup', dragStop, false);
          document.documentElement.removeEventListener('touchend', dragStop, false);
        };

        const setWidth = width => (preview.style.width = width + 'px');

        resizer.addEventListener('mousedown', dragStart);
        resizer.addEventListener('touchstart', dragStart);
      }, false);
    });
  });

  // Toggle source mode
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    const codeBlock = button?.closest('.code-block');

    if (button?.classList.contains('code-block__button--html')) {
      setFlavor('html');
    } else if (button?.classList.contains('code-block__button--react')) {
      setFlavor('react');
    } else {
      return;
    }

    // Update flavor buttons
    [...document.querySelectorAll('.code-block')].map(codeBlock => {
      codeBlock
        .querySelector('.code-block__button--html')
        ?.classList.toggle('code-block__button--selected', flavor === 'html');
      codeBlock
        .querySelector('.code-block__button--react')
        ?.classList.toggle('code-block__button--selected', flavor === 'react');
    });
  });

  // Expand and collapse code blocks
  document.addEventListener('click', event => {
    const toggle = event.target.closest('.code-block__toggle');
    if (toggle) {
      const codeBlock = event.target.closest('.code-block');
      codeBlock.classList.toggle('code-block--expanded');
      event.target.setAttribute('aria-expanded', codeBlock.classList.contains('code-block--expanded'));
    }
  });

  // Show pulse when copying
  document.addEventListener('click', event => {
    const button = event.target.closest('.docsify-copy-code-button');
    if (button) {
      button.classList.remove('copied');
      requestAnimationFrame(() => {
        button.addEventListener('animationend', () => button.classList.remove('copied'), { once: true });
        button.classList.add('copied');
      });
    }
  });

  // Open in CodePen
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    const version = sessionStorage.getItem('sl-version');

    if (button?.classList.contains('code-block__button--codepen')) {
      const codeBlock = button.closest('.code-block');
      const htmlExample = codeBlock.querySelector('.code-block__source--html > pre > code')?.textContent;
      const reactExample = codeBlock.querySelector('.code-block__source--react > pre > code')?.textContent;
      const isReact = flavor === 'react' && typeof reactExample === 'string';
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
      const editors = isReact ? '0010' : '1000';
      let htmlTemplate = '';
      let jsTemplate = '';
      let cssTemplate = '';

      const form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define';
      form.method = 'POST';
      form.target = '_blank';

      // HTML templates
      if (!isReact) {
        htmlTemplate =
          `<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${version}/dist/shoelace.js"></script>\n` +
          '\n' +
          htmlExample;
        jsTemplate = '';
      }

      // React templates
      if (isReact) {
        htmlTemplate = '<div id="root"></div>';
        jsTemplate =
          `import React from 'https://cdn.skypack.dev/react@${reactVersion}';\n` +
          `import ReactDOM from 'https://cdn.skypack.dev/react-dom@${reactVersion}';\n` +
          `import { setBasePath } from 'https://cdn.skypack.dev/@shoelace-style/shoelace@${version}/dist/utilities/base-path';\n` +
          '\n' +
          `// Set the base path for Shoelace assets\n` +
          `setBasePath('https://cdn.skypack.dev/@shoelace-style/shoelace@${version}/dist/')\n` +
          '\n' +
          convertModuleLinks(reactExample) +
          '\n' +
          '\n' +
          `ReactDOM.render(<App />, document.getElementById('root'));`;
      }

      // CSS templates
      cssTemplate =
        `@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${version}/dist/themes/${
          isDark ? 'dark' : 'light'
        }.css';\n` +
        '\n' +
        'body {\n' +
        '  font: 16px sans-serif;\n' +
        '  background-color: var(--sl-color-neutral-0);\n' +
        '  color: var(--sl-color-neutral-900);\n' +
        '  padding: 1rem;\n' +
        '}';

      // Docs: https://blog.codepen.io/documentation/prefill/
      const data = {
        title: '',
        description: '',
        tags: ['shoelace', 'web components'],
        editors,
        head: `<meta name="viewport" content="width=device-width">`,
        html_classes: `sl-theme-${isDark ? 'dark' : 'light'}`,
        css_external: ``,
        js_external: ``,
        js_module: true,
        js_pre_processor: isReact ? 'babel' : 'none',
        html: htmlTemplate,
        css: cssTemplate,
        js: jsTemplate
      };

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'data';
      input.value = JSON.stringify(data);
      form.append(input);

      document.body.append(form);
      form.submit();
      form.remove();
    }
  });
})();
