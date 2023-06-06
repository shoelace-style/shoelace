function normalizePathname(pathname) {
  // Remove /index.html
  if (pathname.endsWith('/index.html')) {
    pathname = pathname.replace(/\/index\.html/, '');
  }

  // Remove trailing slashes
  return pathname.replace(/\/$/, '');
}

/**
 * Adds a class name to links that are currently active.
 */
module.exports = function (doc, options) {
  options = {
    className: 'active-link', // the class to add to active links
    pathname: undefined, // the current pathname to compare
    within: 'body', // element containing the target links
    ...options
  };

  const within = doc.querySelector(options.within);

  if (!within) {
    return doc;
  }

  within.querySelectorAll('a').forEach(link => {
    if (normalizePathname(options.pathname) === normalizePathname(link.pathname)) {
      link.classList.add(options.className);
    }
  });

  return doc;
};
