(() => {
  let count = 1;

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
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

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  window.$docsify.plugins.push((hook, vm) => {
    // Convert code blocks to previews
    hook.afterEach(function (html, next) {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(html, 'text/html');
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
          const pre = code.closest('pre');
          const preId = `code-block-preview-${count}`;
          const toggleId = `code-block-toggle-${count}`;

          pre.id = preId;
          pre.classList.add('code-block__source');
          pre.setAttribute('data-lang', pre.getAttribute('data-lang').replace(/ preview$/, ''));
          pre.setAttribute('aria-labelledby', toggleId);

          const codeBlock = `
            <div class="code-block">
              <div class="code-block__preview">
                ${code.textContent}
                <div class="code-block__resizer">
                  <sl-icon name="grip-vertical"></sl-icon>
                </div>
              </div>

              ${pre.outerHTML}

              <div class="code-block__buttons">
                <button type="button" class="code-block__button code-block__toggle" aria-expanded="false" aria-controls="${preId}">
                  View Source
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

          count++;
        }
      });

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

  // Open in CodePen
  document.addEventListener('click', event => {
    const button = event.target.closest('button');

    if (button?.classList.contains('code-block__button--codepen')) {
      const codeBlock = button.closest('.code-block');
      const html = codeBlock.querySelector('.code-block__source > code').textContent;
      const version = sessionStorage.getItem('sl-version');

      const form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define';
      form.method = 'POST';
      form.target = '_blank';

      // Docs: https://blog.codepen.io/documentation/prefill/
      const data = {
        title: '',
        description: '',
        tags: ['shoelace', 'web components'],
        editors: '100',
        head: `<meta name="viewport" content="width=device-width">`,
        css_external: ``,
        js_external: ``,
        js_module: true,
        html:
          `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${version}/dist/themes/light.css">\n` +
          `<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${version}/dist/shoelace.js/+esm"></script>\n` +
          `\n` +
          html,
        css: `body {\n  font: 16px sans-serif;\n}`,
        js: ``
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
})();
