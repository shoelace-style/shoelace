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
            >
              <sl-icon name="grip-vertical"></sl-icon>
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
      [...document.querySelectorAll('.code-block__preview')].map(preview => {
        const resizer = preview.querySelector('.code-block__resizer');
        let startX;
        let startWidth;

        const dragStart = event => {
          startX = event.changedTouches ? event.changedTouches[0].pageX : event.clientX;
          startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10);
          preview.classList.add('code-block__preview--dragging');
          event.preventDefault();
          resizer.focus();
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

        const handleKeyDown = event => {
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            const currentWidth = preview.clientWidth;
            const maxWidth = preview.parentElement.clientWidth;
            const incr = event.shiftKey ? 100 : 10;

            event.preventDefault();

            if (event.key === 'ArrowLeft') setWidth(currentWidth - incr);
            if (event.key === 'ArrowRight') setWidth(currentWidth + incr);
            if (event.key === 'Home') setWidth(0);
            if (event.key === 'End') setWidth(maxWidth);
          }
        };

        const setWidth = width => preview.style.width = width + 'px';

        resizer.addEventListener('mousedown', dragStart);
        resizer.addEventListener('touchstart', dragStart);
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
