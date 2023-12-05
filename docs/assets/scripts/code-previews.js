(() => {
  function getFlavor() {
    return sessionStorage.getItem('flavor') || 'html';
  }

  function setFlavor(newFlavor) {
    flavor = ['html', 'slim'].includes(newFlavor) ? newFlavor : 'html';
    sessionStorage.setItem('flavor', flavor);

    // Set the flavor class on the body
    document.documentElement.classList.toggle('flavor-html', flavor === 'html');
    document.documentElement.classList.toggle('flavor-slim', flavor === 'slim');
  }

  function syncFlavor() {
    setFlavor(getFlavor());

    document.querySelectorAll('.code-preview__button--html').forEach(preview => {
      if (flavor === 'html') {
        preview.classList.add('code-preview__button--selected');
      }
    });

    document.querySelectorAll('.code-preview__button--slim').forEach(preview => {
      if (flavor === 'slim') {
        preview.classList.add('code-preview__button--selected');
      }
    });
  }

  // For local testing before cutting a release, you can set the version to the latest upstream and org to `shoelace-style`
  const shoelaceVersion = document.documentElement.getAttribute('data-shoelace-version');
  const org = 'teamshares';
  const cdndir = 'cdn';
  const npmdir = 'dist';
  let flavor = getFlavor();

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
    } else if (button?.classList.contains('code-preview__button--slim')) {
      // Show Slim
      setFlavor('slim');
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
      cb.querySelector('.code-preview__button--slim')?.classList.toggle(
        'code-preview__button--selected',
        flavor === 'slim'
      );
    });
  });

  function toggleSource(codeBlock, force) {
    codeBlock.classList.toggle('code-preview--expanded', force);
    codeBlock.setAttribute('aria-expanded', codeBlock.classList.contains('code-preview--expanded'));
  }

  //
  // Open in CodePen
  //
  document.addEventListener('click', event => {
    const button = event.target.closest('button');

    if (button?.classList.contains('code-preview__button--codepen')) {
      const codeBlock = button.closest('.code-preview');
      const slimExample = codeBlock.querySelector('.code-preview__source--slim > pre > code')?.textContent;

      const form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define';
      form.method = 'POST';
      form.target = '_blank';

      const htmlTemplate = `${slimExample}`;
      const jsTemplate =
        `import { registerExternalLibraries } from 'https://esm.sh/@${org}/shoelace@${shoelaceVersion}/${cdndir}/utilities/icon-library';\n` +
        `registerExternalLibraries();\n` +
        `import tokens from "https://esm.sh/@${org}/shoelace@${shoelaceVersion}/${npmdir}/styles/tokens.json" assert { type: "json" };\n` +
        `\n` +
        `// Configure Tailwind so we can prototype with TS custom colors\n` +
        `tailwind.config = { theme: { extend: tokens } };\n`;

      // CSS templates
      const cssTemplate =
        `@import 'https://esm.sh/@${org}/shoelace@${shoelaceVersion}/${cdndir}/themes/light.css';\n` +
        `@import 'https://esm.sh/@${org}/shoelace@${shoelaceVersion}/${cdndir}/styles/index.css';\n` +
        '\n' +
        'body {\n' +
        '  font: 16px sans-serif;\n' +
        '  background-color: var(--sl-color-neutral-0);\n' +
        '  color: var(--sl-color-neutral-900);\n' +
        '  padding: 1rem;\n' +
        '}';

      const headTemplate =
        `<meta name="viewport" content="width=device-width">\n` +
        `\n` +
        `<!-- Import Inter font -->\n` +
        `<link rel="preconnect" href="https://fonts.googleapis.com" />\n` +
        `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n` +
        `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n` +
        `\n` +
        `<!-- Import Tailwind typography plugin and related classes -->\n` +
        `<script src="https://cdn.tailwindcss.com?plugins=typography"></script>\n` +
        `<style type="text/tailwindcss">@layer components {.ts-heading-1 {@apply text-7xl font-bold leading-none tracking-tight;}.ts-heading-2 {@apply text-6xl font-bold leading-none tracking-tight;}.ts-heading-3 {@apply text-5xl font-bold leading-none tracking-tight;}.ts-heading-4 {@apply text-4xl font-bold leading-tight tracking-tight;}.ts-heading-5 {@apply text-2xl font-bold leading-7 tracking-tight;}.ts-heading-6 {@apply text-xl font-medium leading-6 tracking-tight;}.ts-heading-7 {@apply text-base font-semibold leading-5 tracking-tight;}.ts-heading-8 {@apply text-sm font-semibold leading-5 tracking-tight;}.ts-subheading {@apply text-xs font-semibold leading-4 tracking-normal uppercase;}.ts-body-large {@apply text-xl font-normal leading-7 tracking-normal;}.ts-body-1 {@apply text-base font-normal leading-6 tracking-normal;}.ts-body-2 {@apply text-sm font-normal leading-5 tracking-normal;}.ts-body-3 {@apply text-xs font-normal leading-4 tracking-normal;}.ts-text-default {@apply text-gray-900;}.ts-text-subdued {@apply text-gray-700;}.ts-text-light {@apply text-white;}.ts-text-light-subdued {@apply text-gray-200;}.ts-text-success {@apply text-green-700;}.ts-text-error {@apply text-red-700;}}</style>\n` +
        `\n` +
        `<!-- Import Shoelace itself -->\n` +
        `<script type='module' src='https://esm.sh/@${org}/shoelace@${shoelaceVersion}/${npmdir}/shoelace.js'></script>\n`;

      // Docs: https://blog.codepen.io/documentation/prefill/
      const data = {
        title: '',
        description: '',
        tags: ['shoelace', 'web components'],
        editors: '1000',
        head: headTemplate,
        html_classes: `sl-theme-light`,
        html_pre_processor: 'slim',
        css_external: ``,
        js_external: ``,
        js_module: true,
        js_pre_processor: 'none',
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
