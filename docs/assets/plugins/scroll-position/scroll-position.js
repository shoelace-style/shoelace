(() => {
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  //
  // Docsify generates pages dynamically and asynchronously, so when a reload happens, the scroll position can't be
  // be restored immediately. This plugin waits until Docsify loads the page and then restores it.
  //
  window.$docsify.plugins.push((hook, vm) => {
    hook.ready(() => {
      // Restore
      const scrollTop = sessionStorage.getItem('bs-scroll');
      if (scrollTop) {
        document.documentElement.scrollTop = scrollTop;
      }

      // Remember
      document.addEventListener('scroll', event => {
        sessionStorage.setItem('bs-scroll', document.documentElement.scrollTop);
      });
    });
  });
})();
