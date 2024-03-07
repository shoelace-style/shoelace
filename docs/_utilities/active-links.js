import { parse } from 'node-html-parser';

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
export function activeLinksPlugin(options) {
  options = {
    className: 'active-link', // the class to add to active links
    pathname: undefined, // the current pathname to compare
    within: 'body', // element containing the target links
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('active-links', function (content) {
      const doc = parse(content);
      const within = doc.querySelector(options.within);

      if (!within) {
        return content;
      }

      // Compare the href attribute to 11ty's page URL
      within.querySelectorAll('a[href]').forEach(a => {
        // eslint-disable-next-line no-invalid-this
        if (normalizePathname(a.getAttribute('href')) === normalizePathname(this.page.url)) {
          a.classList.add(options.className);
        }
      });

      return doc.toString();
    });
  };
}
