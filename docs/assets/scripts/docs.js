//
// Sidebar
//
// When the sidebar is hidden, we apply the inert attribute to prevent focus from reaching it. Due to the many states
// the sidebar can have (e.g. static, hidden, expanded), we test for visibility by checking to see if it's placed
// offscreen or not. Then, on resize/transition we make sure to update the attribute accordingly.
//
(() => {
  function getSidebar() {
    return document.getElementById('sidebar');
  }

  function isSidebarOpen() {
    return document.documentElement.classList.contains('sidebar-open');
  }

  function isSidebarVisible() {
    return getSidebar().getBoundingClientRect().x >= 0;
  }

  function toggleSidebar(force) {
    const isOpen = typeof force === 'boolean' ? force : !isSidebarOpen();
    return document.documentElement.classList.toggle('sidebar-open', isOpen);
  }

  function updateInert() {
    getSidebar().inert = !isSidebarVisible();
  }

  // Toggle the menu
  document.addEventListener('click', event => {
    const menuToggle = event.target.closest('#menu-toggle');
    if (!menuToggle) return;
    toggleSidebar();
  });

  // Update the sidebar's inert state when the window resizes and when the sidebar transitions
  window.addEventListener('resize', () => toggleSidebar(false));

  document.addEventListener('transitionend', event => {
    const sidebar = event.target.closest('#sidebar');
    if (!sidebar) return;
    updateInert();
  });

  // Close when a menu item is selected on mobile
  document.addEventListener('click', event => {
    const sidebar = event.target.closest('#sidebar');
    const link = event.target.closest('a');
    if (!sidebar || !link) return;

    if (isSidebarOpen()) {
      toggleSidebar();
    }
  });

  // Close when open and escape is pressed
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isSidebarOpen()) {
      event.stopImmediatePropagation();
      toggleSidebar();
    }
  });

  // Close when clicking outside of the sidebar
  document.addEventListener('mousedown', event => {
    if (isSidebarOpen() & !event.target?.closest('#sidebar, #menu-toggle')) {
      event.stopImmediatePropagation();
      toggleSidebar();
    }
  });

  updateInert();
})();

//
// Theme switcher
//
(() => {
  function toggleTheme() {
    const isDark = !document.documentElement.classList.contains('sl-theme-dark');
    document.documentElement.classList.toggle('sl-theme-dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Toggle the theme
  document.addEventListener('click', event => {
    const themeToggle = event.target.closest('#theme-toggle');
    if (!themeToggle) return;
    toggleTheme();
  });

  // Toggle with backslash
  document.addEventListener('keydown', event => {
    if (
      event.key === '\\' &&
      !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
    ) {
      event.preventDefault();
      toggleTheme();
    }
  });
})();

//
// Open details when printing
//
(() => {
  const detailsOpenOnPrint = new Set();

  window.addEventListener('beforeprint', () => {
    detailsOpenOnPrint.clear();
    document.querySelectorAll('details').forEach(details => {
      if (details.open) {
        detailsOpenOnPrint.add(details);
      }
      details.open = true;
    });
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('details').forEach(details => {
      details.open = detailsOpenOnPrint.has(details);
    });
    detailsOpenOnPrint.clear();
  });
})();

//
// Copy code buttons
//
(() => {
  document.addEventListener('click', event => {
    const button = event.target.closest('.copy-code-button');
    const pre = button?.closest('pre');
    const code = pre?.querySelector('code');
    const copyIcon = button?.querySelector('.copy-code-button__copy-icon');
    const copiedIcon = button?.querySelector('.copy-code-button__copied-icon');

    if (button && code) {
      navigator.clipboard.writeText(code.innerText);
      copyIcon.style.display = 'none';
      copiedIcon.style.display = 'inline';
      button.classList.add('copy-code-button--copied');

      setTimeout(() => {
        copyIcon.style.display = 'inline';
        copiedIcon.style.display = 'none';
        button.classList.remove('copy-code-button--copied');
      }, 1000);
    }
  });
})();

//
// Smooth links
//
(() => {
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    const id = (link?.hash ?? '').substr(1);
    const isFragment = link?.hasAttribute('href') && link?.getAttribute('href').startsWith('#');

    if (!link || !isFragment || link.getAttribute('data-smooth-link') === 'false') {
      return;
    }

    // Scroll to the top
    if (link.hash === '') {
      event.preventDefault();
      window.scroll({ top: 0, behavior: 'smooth' });
      history.pushState(undefined, undefined, location.pathname);
    }

    // Scroll to an id
    if (id) {
      const target = document.getElementById(id);

      if (target) {
        event.preventDefault();
        window.scroll({ top: target.offsetTop, behavior: 'smooth' });
        history.pushState(undefined, undefined, `#${id}`);
      }
    }
  });
})();

//
// Table of Contents scrollspy
//
(() => {
  // This will be stale if its not a function.
  const getLinks = () => [...document.querySelectorAll('.content__toc a')];
  const linkTargets = new WeakMap();
  const visibleTargets = new WeakSet();
  const observer = new IntersectionObserver(handleIntersect, { rootMargin: '0px 0px' });
  let debounce;

  function handleIntersect(entries) {
    entries.forEach(entry => {
      // Remember which targets are visible
      if (entry.isIntersecting) {
        visibleTargets.add(entry.target);
      } else {
        visibleTargets.delete(entry.target);
      }
    });

    updateActiveLinks();
  }

  function updateActiveLinks() {
    const links = getLinks();
    // Find the first visible target and activate the respective link
    links.find(link => {
      const target = linkTargets.get(link);

      if (target && visibleTargets.has(target)) {
        links.forEach(el => el.classList.toggle('active', el === link));
        return true;
      }

      return false;
    });
  }

  // Observe link targets
  function observeLinks() {
    getLinks().forEach(link => {
      const hash = link.hash.slice(1);
      const target = hash ? document.querySelector(`.content__body #${hash}`) : null;

      if (target) {
        linkTargets.set(link, target);
        observer.observe(target);
      }
    });
  }

  observeLinks();

  document.addEventListener('turbo:load', updateActiveLinks);
  document.addEventListener('turbo:load', observeLinks);
})();

//
// Show custom versions in the sidebar
//
(() => {
  function updateVersion() {
    const el = document.querySelector('.sidebar-version');
    if (!el) return;

    if (location.hostname === 'next.shoelace.style') el.textContent = 'Next';
    if (location.hostname === 'localhost') el.textContent = 'Development';
  }

  updateVersion();

  document.addEventListener('turbo:load', updateVersion);
})();
