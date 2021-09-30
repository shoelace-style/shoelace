(() => {
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    // Append the search box to the sidebar
    hook.mounted(function () {
      const appName = document.querySelector('.sidebar .app-name');
      const searchBox = document.createElement('div');
      searchBox.classList.add('search-box');
      searchBox.innerHTML = `
        <sl-input
          type="search"
          placeholder="Search"
          clearable
          pill
        >
          <sl-icon slot="prefix" name="search"></sl-icon>
          <kbd slot="suffix" title="Press / to search">/</kbd>
        </sl-input>
      `;
      const searchBoxInput = searchBox.querySelector('sl-input');

      appName.insertAdjacentElement('afterend', searchBox);

      // Show the search panel when the search is clicked
      searchBoxInput.addEventListener('mousedown', event => {
        event.preventDefault();
        show();
      });

      // Show the search panel when a key is pressed
      searchBoxInput.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
          return;
        }

        // Pass the character that was typed through to the search input
        if (event.key.length === 1) {
          event.preventDefault();
          input.value = event.key;
          show();
        }
      });
    });

    // Append the search panel to the body
    const siteSearch = document.createElement('div');
    siteSearch.classList.add('site-search');
    siteSearch.hidden = true;
    siteSearch.innerHTML = `
      <div class="site-search__overlay"></div>
      <div class="site-search__panel">
        <header class="site-search__header">
          <sl-input
            class="site-search__input"
            type="search"
            placeholder="Search this site"
            size="large"
            clearable
          >
            <sl-icon slot="prefix" name="search"></sl-icon>
          </sl-input>
        </header>
        <div class="site-search__body">
          <ul class="site-search__results"></ul>
          <div class="site-search__empty">No results found.</div>
        </div>
        <footer class="site-search__footer">
          <small><kbd>↑</kbd> <kbd>↓</kbd> navigate</small>
          <small><kbd>↲</kbd> select</small>
          <small><kbd>esc</kbd> close</small>
        </footer>
      </div>
    `;
    document.body.append(siteSearch);

    const searchButtons = [...document.querySelectorAll('[data-site-search]')];
    const overlay = siteSearch.querySelector('.site-search__overlay');
    const panel = siteSearch.querySelector('.site-search__panel');
    const input = siteSearch.querySelector('.site-search__input');
    const results = siteSearch.querySelector('.site-search__results');
    const animationDuration = 150;
    const searchDebounce = 200;
    let isShowing = false;
    let searchTimeout;
    let searchIndex;
    let map;

    // Load search data
    const searchData = fetch('../../../search.json')
      .then(res => res.json())
      .then(data => {
        searchIndex = lunr.Index.load(data.searchIndex);
        map = data.map;
      });

    async function show() {
      isShowing = true;
      document.body.classList.add('site-search-visible');
      siteSearch.hidden = false;
      input.focus();
      updateResults();

      await Promise.all([
        panel.animate(
          [
            { opacity: 0, transform: 'scale(.9)' },
            { opacity: 1, transform: 'scale(1)' }
          ],
          { duration: animationDuration }
        ).finished,
        overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: animationDuration }).finished
      ]);

      document.addEventListener('mousedown', handleDocumentMouseDown);
      document.addEventListener('keydown', handleDocumentKeyDown);
      document.addEventListener('focusin', handleDocumentFocusIn);
    }

    async function hide() {
      isShowing = false;
      document.body.classList.remove('site-search-visible');

      await Promise.all([
        panel.animate(
          [
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(.9)' }
          ],
          { duration: animationDuration }
        ).finished,
        overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: animationDuration }).finished
      ]);

      siteSearch.hidden = true;
      input.value = '';
      updateResults();

      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('focusin', handleDocumentFocusIn);
    }

    function handleInput() {
      // Debounce search queries
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => updateResults(input.value), searchDebounce);
    }

    function handleDocumentFocusIn(event) {
      // Close when focus leaves the panel
      if (event.target.closest('.site-search__panel') !== panel) {
        hide();
      }
    }

    function handleDocumentMouseDown(event) {
      // Close when clicking outside of the panel
      if (event.target.closest('.site-search__overlay') === overlay) {
        hide();
      }
    }

    function handleDocumentKeyDown(event) {
      // Close when pressing escape
      if (event.key === 'Escape') {
        event.preventDefault();
        hide();
        return;
      }

      // Handle keyboard selections
      if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'].includes(event.key)) {
        event.preventDefault();

        const currentEl = results.querySelector('[aria-selected="true"]');
        const items = [...results.querySelectorAll('li')];
        const index = items.indexOf(currentEl);
        let nextEl;

        if (items.length === 0) {
          return;
        }

        switch (event.key) {
          case 'ArrowUp':
            nextEl = items[Math.max(0, index - 1)];
            break;
          case 'ArrowDown':
            nextEl = items[Math.min(items.length - 1, index + 1)];
            break;
          case 'Home':
            nextEl = items[0];
            break;
          case 'End':
            nextEl = items[items.length - 1];
            break;
          case 'Enter':
            currentEl?.querySelector('a')?.click();
            break;
        }

        // Update the selected item
        items.map(item => {
          if (item === nextEl) {
            item.setAttribute('aria-selected', 'true');
            nextEl.scrollIntoView({ block: 'nearest' });
          } else {
            item.setAttribute('aria-selected', 'false');
          }
        });

        return;
      }
    }

    async function updateResults(query = '') {
      try {
        await searchIndex;

        const hasQuery = query.length > 0;
        let matches = hasQuery ? searchIndex.search(`${query}`) : [];

        // Fall back to a fuzzy search if no matches are found
        if (matches.length === 0 && hasQuery) {
          matches = searchIndex.search(`${query}~2`);
        }

        let hasResults = hasQuery && matches.length > 0;
        siteSearch.classList.toggle('site-search--has-results', hasQuery && hasResults);
        siteSearch.classList.toggle('site-search--no-results', hasQuery && !hasResults);
        panel.setAttribute('aria-expanded', hasQuery && hasResults ? 'true' : 'false');

        results.innerHTML = '';

        matches.map((match, index) => {
          const page = map[match.ref];
          const li = document.createElement('li');
          const a = document.createElement('a');
          let icon = 'file-text';

          if (page.url.includes('getting-started/')) icon = 'lightbulb';
          if (page.url.includes('resources/')) icon = 'book';
          if (page.url.includes('components/')) icon = 'puzzle';
          if (page.url.includes('tokens/')) icon = 'palette2';
          if (page.url.includes('utilities/')) icon = 'wrench';
          if (page.url.includes('tutorials/')) icon = 'joystick';

          a.href = $docsify.routerMode === 'hash' ? `/#/${page.url}` : `/${page.url}`;
          a.innerHTML = `
            <div class="site-search__result-icon">
              <sl-icon name="${icon}" aria-hidden="true"></sl-icon>
            </div>
            <div class="site-search__result__details">
              <h3>${page.title}</h3>
              <small>${page.url}</small>
            </div>
          `;

          li.classList.add('site-search__result');
          li.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          li.appendChild(a);
          results.appendChild(li);
        });
      } catch {
        // Ignore query errors as the user types
      }
    }

    // Show the search panel slash is pressed outside of a form element
    document.addEventListener('keydown', event => {
      if (
        !isShowing &&
        event.key === '/' &&
        !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
      ) {
        event.preventDefault();
        show();
      }
    });

    input.addEventListener('sl-input', handleInput);

    // Close when a result is selected
    results.addEventListener('click', event => {
      if (event.target.closest('a')) {
        hide();
      }
    });
  });
})();
