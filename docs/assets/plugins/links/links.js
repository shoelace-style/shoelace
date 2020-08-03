(() => {
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(function () {

      document.addEventListener('click', event => {
        const tag = event.target.tagName.toLowerCase();
        const href = event.target.getAttribute('data-href');

        if (tag === 'sl-button' && href) {
          window.open(href);
        }
      });
     });
  });
})();
