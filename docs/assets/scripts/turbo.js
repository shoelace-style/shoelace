import * as Turbo from 'https://cdn.jsdelivr.net/npm/@hotwired/turbo@7.3.0/+esm'

;(() => {
  if (!window.scrollPositions) {
    window.scrollPositions = {};
  }

  function preserveScroll () {
    document.querySelectorAll("[data-preserve-scroll").forEach((element) => {
      scrollPositions[element.id] = element.scrollTop;
    })
  }

  function restoreScroll () {
    document.querySelectorAll("[data-preserve-scroll").forEach((element) => {
      element.scrollTop = scrollPositions[element.id];
    })
  }

  window.addEventListener("turbo:before-cache", preserveScroll)
  window.addEventListener("turbo:before-render", restoreScroll)
  window.addEventListener("turbo:render", restoreScroll)

  // Do this to prevent jankiness on the sidebar.
  // make sure it has data-turbo-permanent
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
  function markActiveLinks(_event) {
    const options = {
      className: 'active-link', // the class to add to active links
      pathname: document.location.pathname, // the current pathname to compare
      within: 'body', // element containing the target links
    };

    const within = document.querySelector(options.within);

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

  window.addEventListener("turbo:load", markActiveLinks)
})()
