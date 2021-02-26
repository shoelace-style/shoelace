(() => {
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(function () {
      // Move search below the app name
      const appName = document.querySelector('.sidebar .app-name');
      const search = document.querySelector('.sidebar .search');
      appName.insertAdjacentElement('afterend', search);
    });
  });
})();
