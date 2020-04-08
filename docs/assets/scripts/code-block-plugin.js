(() => {
  let count = 1;

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  function runScript(script) {
    const newScript = document.createElement('script');
    newScript.appendChild(document.createTextNode(script.innerHTML));
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

      [...doc.querySelectorAll('code[class^="lang-"]')].map(code => {
        if (code.classList.contains('preview')) {
          const codeBlock = document.createElement('div');
          const preview = document.createElement('div');
          const pre = code.closest('pre');
          const preId = `code-block-preview-${count}`;
          const toggle = document.createElement('button');
          const toggleId = `code-block-toggle-${count}`;

          wrap(pre, codeBlock);

          codeBlock.classList.add('code-block');

          preview.classList.add('code-block__preview');
          preview.innerHTML = code.textContent;
          preview.innerHTML += `
            <div class="code-block__resizer">
              <svg width="9" viewBox="0 0 9 15" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor" fill-rule="nonzero" transform="translate(8) rotate(90)">
                  <circle cx="1.5" cy="1.5" r="1.25"></circle>
                  <circle cx="1.5" cy="6.5" r="1.25"></circle>
                  <circle cx="7.5" cy="1.5" r="1.25"></circle>
                  <circle cx="7.5" cy="6.5" r="1.25"></circle>
                  <circle cx="13.5" cy="1.5" r="1.25"></circle>
                  <circle cx="13.5" cy="6.5" r="1.25"></circle>
                </g>
              </svg>
            </div>
          `;

          pre.id = preId;
          pre.classList.add('code-block__source');
          pre.setAttribute('data-lang', pre.getAttribute('data-lang').replace(/ preview$/, ''));
          pre.setAttribute('aria-labeledby', toggleId);

          toggle.id = toggleId;
          toggle.type = 'button';
          toggle.classList.add('code-block__toggle');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-controls', preId);
          toggle.innerHTML = '<sl-icon name="chevron-down"></sl-icon>';

          codeBlock.prepend(preview);
          codeBlock.append(toggle);

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
      [...document.querySelectorAll('.code-block__preview')].map(resizeElement => {
        let startX;
        let startY;
        let startWidth;
        let startHeight;

        const initDrag = event => {
          startX = event.clientX;
          startY = event.clientY;
          startWidth = parseInt(document.defaultView.getComputedStyle(resizeElement).width, 10);
          startHeight = parseInt(document.defaultView.getComputedStyle(resizeElement).height, 10);
          document.documentElement.addEventListener('mousemove', doDrag, false);
          document.documentElement.addEventListener('mouseup', stopDrag, false);
          event.preventDefault();
        };

        const doDrag = event => {
          resizeElement.style.width = startWidth + event.clientX - startX + 'px';
        };

        const stopDrag = event => {
          document.documentElement.removeEventListener('mousemove', doDrag, false);
          document.documentElement.removeEventListener('mouseup', stopDrag, false);
        };

        resizeElement.querySelector('.code-block__resizer').addEventListener('mousedown', initDrag);
      }, false);
    });
  });

  // Expand and collapse code blocks
  document.addEventListener('click', event => {
    if (event.target.classList.contains('code-block__toggle')) {
      const codeBlock = event.target.closest('.code-block');
      codeBlock.classList.toggle('code-block--expanded');
      event.target.setAttribute('aria-expanded', codeBlock.classList.contains('code-block--expanded'));
    }
  });
})();
