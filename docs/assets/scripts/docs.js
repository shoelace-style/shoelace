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
// Theme selector
//
(() => {
  function getTheme() {
    return localStorage.getItem('theme') || 'auto';
  }

  function isDark() {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  }

  function setTheme(newTheme) {
    theme = newTheme;
    localStorage.setItem('theme', theme);

    // Update the UI
    updateSelection();

    // Toggle the dark mode class
    document.documentElement.classList.toggle('sl-theme-dark', isDark());
  }

  function updateSelection() {
    const menu = document.querySelector('#theme-selector sl-menu');
    if (!menu) return;
    [...menu.querySelectorAll('sl-menu-item')].map(item => (item.checked = item.getAttribute('value') === theme));
  }

  let theme = getTheme();

  // Selection is not preserved when changing page, so update when opening dropdown
  document.addEventListener('sl-show', event => {
    const themeSelector = event.target.closest('#theme-selector');
    if (!themeSelector) return;
    updateSelection();
  });

  // Listen for selections
  document.addEventListener('sl-select', event => {
    const menu = event.target.closest('#theme-selector sl-menu');
    if (!menu) return;
    setTheme(event.detail.item.value);
  });

  // Update the theme when the preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(theme));

  // Toggle with backslash
  document.addEventListener('keydown', event => {
    if (
      event.key === '\\' &&
      !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
    ) {
      event.preventDefault();
      setTheme(isDark() ? 'light' : 'dark');
    }
  });

  // Set the initial theme and sync the UI
  setTheme(theme);
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
