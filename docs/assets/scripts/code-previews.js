(() => {
  function convertModuleLinks(html) {
    html = html
      .replace(/@shoelace-style\/shoelace/g, `https://esm.sh/@shoelace-style/shoelace@${shoelaceVersion}`)
      .replace(/from 'react'/g, `from 'https://esm.sh/react@${reactVersion}'`)
      .replace(/from "react"/g, `from "https://esm.sh/react@${reactVersion}"`);

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
    return sessionStorage.getItem('flavor') || 'html';
  }

  function setFlavor(newFlavor) {
    flavor = ['html', 'react'].includes(newFlavor) ? newFlavor : 'html';
    sessionStorage.setItem('flavor', flavor);

    // Set the flavor class on the body
    document.documentElement.classList.toggle('flavor-html', flavor === 'html');
    document.documentElement.classList.toggle('flavor-react', flavor === 'react');
  }

  function syncFlavor() {
    setFlavor(getFlavor());

    document.querySelectorAll('.code-preview__button--html').forEach(preview => {
      if (flavor === 'html') {
        preview.classList.add('code-preview__button--selected');
      }
    });

    document.querySelectorAll('.code-preview__button--react').forEach(preview => {
      if (flavor === 'react') {
        preview.classList.add('code-preview__button--selected');
      }
    });
  }

  const shoelaceVersion = document.documentElement.getAttribute('data-shoelace-version');
  const reactVersion = '^18';
  const cdndir = 'cdn';
  const npmdir = 'dist';
  let flavor = getFlavor();
  let count = 1;

  // We need the version to open
  if (!shoelaceVersion) {
    throw new Error('The data-shoelace-version attribute is missing from <html>.');
  }

  // Sync flavor UI on page load
  syncFlavor();

  //
  // Resizing previews
  //
  document.addEventListener('mousedown', handleResizerDrag);
  document.addEventListener('touchstart', handleResizerDrag, { passive: true });

  function handleResizerDrag(event) {
    const resizer = event.target.closest('.code-preview__resizer');
    const preview = event.target.closest('.code-preview__preview');

    if (!resizer || !preview) return;

    let startX = event.changedTouches ? event.changedTouches[0].pageX : event.clientX;
    let startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10);

    event.preventDefault();
    preview.classList.add('code-preview__preview--dragging');
    document.documentElement.addEventListener('mousemove', dragMove);
    document.documentElement.addEventListener('touchmove', dragMove);
    document.documentElement.addEventListener('mouseup', dragStop);
    document.documentElement.addEventListener('touchend', dragStop);

    function dragMove(event) {
      const width = startWidth + (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - startX;
      preview.style.width = `${width}px`;
    }

    function dragStop() {
      preview.classList.remove('code-preview__preview--dragging');
      document.documentElement.removeEventListener('mousemove', dragMove);
      document.documentElement.removeEventListener('touchmove', dragMove);
      document.documentElement.removeEventListener('mouseup', dragStop);
      document.documentElement.removeEventListener('touchend', dragStop);
    }
  }

  //
  // Toggle source mode
  //
  document.addEventListener('click', event => {
    const button = event.target.closest('.code-preview__button');
    const codeBlock = button?.closest('.code-preview');

    if (button?.classList.contains('code-preview__button--html')) {
      // Show HTML
      setFlavor('html');
      toggleSource(codeBlock, true);
    } else if (button?.classList.contains('code-preview__button--react')) {
      // Show React
      setFlavor('react');
      toggleSource(codeBlock, true);
    } else if (button?.classList.contains('code-preview__toggle')) {
      // Toggle source
      toggleSource(codeBlock);
    } else {
      return;
    }

    // Update flavor buttons
    [...document.querySelectorAll('.code-preview')].forEach(cb => {
      cb.querySelector('.code-preview__button--html')?.classList.toggle(
        'code-preview__button--selected',
        flavor === 'html'
      );
      cb.querySelector('.code-preview__button--react')?.classList.toggle(
        'code-preview__button--selected',
        flavor === 'react'
      );
    });
  });

  function toggleSource(codeBlock, force) {
    codeBlock.classList.toggle('code-preview--expanded', force);
    event.target.setAttribute('aria-expanded', codeBlock.classList.contains('code-preview--expanded'));
  }

  //
  // Open in CodePen
  //
  document.addEventListener('click', event => {
    const button = event.target.closest('button');

    if (button?.classList.contains('code-preview__button--codepen')) {
      const codeBlock = button.closest('.code-preview');
      const htmlExample = codeBlock.querySelector('.code-preview__source--html > pre > code')?.textContent;
      const reactExample = codeBlock.querySelector('.code-preview__source--react > pre > code')?.textContent;
      const isReact = flavor === 'react' && typeof reactExample === 'string';
      const theme = document.documentElement.classList.contains('sl-theme-dark') ? 'dark' : 'light';
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
          `<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${shoelaceVersion}/${cdndir}/shoelace.js"></script>\n` +
          `\n${htmlExample}`;
        jsTemplate = '';
      }

      // React templates
      if (isReact) {
        htmlTemplate = '<div id="root"></div>';
        jsTemplate =
          `import React from 'https://esm.sh/react@${reactVersion}';\n` +
          `import ReactDOM from 'https://esm.sh/react-dom@${reactVersion}';\n` +
          `import { setBasePath } from 'https://esm.sh/@shoelace-style/shoelace@${shoelaceVersion}/${cdndir}/utilities/base-path';\n` +
          `\n` +
          `// Set the base path for Shoelace assets\n` +
          `setBasePath('https://esm.sh/@shoelace-style/shoelace@${shoelaceVersion}/${npmdir}/')\n` +
          `\n${convertModuleLinks(reactExample)}\n` +
          `\n` +
          `ReactDOM.render(<App />, document.getElementById('root'));`;
      }

      // CSS templates
      cssTemplate =
        `@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${shoelaceVersion}/${cdndir}/themes/${
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

      document.documentElement.append(form);
      form.submit();
      form.remove();
    }
  });

  // Set the initial flavor
  window.addEventListener('turbo:load', syncFlavor);
})();
