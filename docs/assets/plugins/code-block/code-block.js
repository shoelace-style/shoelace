(() => {
  let count = 1;

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  function runScript(script) {
    const newScript = document.createElement('script');
    newScript.appendChild(
      document.createTextNode(`
      (() => {
        ${script.innerHTML}
      })();
    `)
    );
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
            <div
              class="code-block__resizer"
              tabindex="0"
              role="scrollbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <sl-icon name="grip-horizontal"></sl-icon>
            </div>
          `;

          pre.id = preId;
          pre.classList.add('code-block__source');
          pre.setAttribute('data-lang', pre.getAttribute('data-lang').replace(/ preview$/, ''));
          pre.setAttribute('aria-labelledby', toggleId);

          toggle.id = toggleId;
          toggle.type = 'button';
          toggle.classList.add('code-block__toggle');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-controls', preId);
          toggle.innerHTML = `
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
          `;

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
        const resizer = resizeElement.querySelector('.code-block__resizer');
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
        };

        const doDrag = event => {
          setWidth(startWidth + event.clientX - startX);
        };

        const stopDrag = event => {
          document.documentElement.removeEventListener('mousemove', doDrag, false);
          document.documentElement.removeEventListener('mouseup', stopDrag, false);
        };

        const handleKeyDown = event => {
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            const currentWidth = resizeElement.clientWidth;
            const maxWidth = resizeElement.parentElement.clientWidth;
            const incr = event.shiftKey ? 100 : 10;

            event.preventDefault();

            if (event.key === 'ArrowLeft') setWidth(currentWidth - incr);
            if (event.key === 'ArrowRight') setWidth(currentWidth + incr);
            if (event.key === 'Home') setWidth(0);
            if (event.key === 'End') setWidth(maxWidth);
          }
        };

        const setWidth = width => {
          resizeElement.style.width = width + 'px';

          const totalWidth = resizeElement.parentElement.clientWidth;
          const currentWidth = resizeElement.clientWidth;
          const valuenow = Math.round((currentWidth / totalWidth) * 100);

          resizer.setAttribute('aria-valuenow', valuenow);
        };

        resizer.addEventListener('mousedown', initDrag);
        resizer.addEventListener('keydown', handleKeyDown);
      }, false);
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
})();
