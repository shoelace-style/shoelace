(() => {
  let metadataStore;

  function createPropsTable(props) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Property</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        ${props
          .map(
            prop => `
        <tr>
          <td>
            <code>${escapeHtml(prop.name)}</code>
            ${prop.name !== prop.attr && prop.attr !== undefined ? (`
              <br>
              <small>
                <sl-tooltip content="Use the kebab-case variation in your HTML">
                  <code class="attribute-tooltip">${escapeHtml(prop.attr)}</code>
                </sl-tooltip>
              </small>`
            ) : ''}
          </td>
          <td>${escapeHtml(prop.docs)}</td>
          <td><code style="white-space: normal;">${escapeHtml(prop.type)}</code></td>
          <td><code style="white-space: normal;">${escapeHtml(prop.default)}</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createEventsTable(events) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            event => `
        <tr>
          <td><code>${escapeHtml(event.event)}</code></td>
          <td>${escapeHtml(event.docs)}</td>
          <td><code style="white-space: normal;">CustomEvent&lt;${escapeHtml(event.detail)}&gt;</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createMethodsTable(methods) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Method</th>
          <th>Description</th>
          <th>Signature</th>
        </tr>
      </thead>
      <tbody>
        ${methods
          .map(
            method => `
        <tr>
          <td><code>${escapeHtml(method.name)}</code></td>
          <td>${escapeHtml(method.docs)}</td>
          <td><code style="white-space: normal;">${escapeHtml(method.signature)}</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createSlotsTable(slots) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Slot</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${slots
          .map(
            slot => `
        <tr>
          <td><code>${slot.name ? escapeHtml(slot.name) : '(default)'}</code></td>
          <td>${escapeHtml(slot.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createCustomPropertiesTable(styles) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${styles
          .map(
            style => `
        <tr>
          <td><code>${escapeHtml(style.name)}</code></td>
          <td>${escapeHtml(style.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createPartsTable(parts) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${parts
          .map(
            part => `
        <tr>
          <td><code>${escapeHtml(part.name)}</code></td>
          <td>${escapeHtml(part.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createDependentsList(dependents) {
    const ul = document.createElement('ul');
    ul.innerHTML = `
        ${dependents
          .map(
            dependent => `
              <li><code>${escapeHtml(dependent)}</code></li>
            `
          )
          .join('')}
    `;

    return ul.outerHTML;
  }

  function escapeHtml(html) {
    return (html + '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  function getMetadata() {
    return new Promise((resolve, reject) => {
      // Simple caching to prevent multiple XHR requests
      if (metadataStore) {
        return resolve(metadataStore);
      }

      fetch('/dist/components.json')
        .then(res => res.json())
        .then(data => {
          metadataStore = data;
          resolve(metadataStore);
        })
        .catch(err => console.error(err));
    });
  }

  function getShortNumber(value) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const index = Math.floor(('' + value).length / 3);
    let shortValue = parseFloat((index !== 0 ? (value / Math.pow(1000, index)) : value).toPrecision(2));

    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }

    return shortValue + suffixes[index];
  }

  function getDocsTagsObject(docsTags) {
    let tags = {};

    for (const tag of docsTags) {
      tags[tag.name] = tag.text;
    }

    return tags;
  }

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(function () {
      getMetadata()
        .then(metadata => {
          const target = document.querySelector('.app-name');

          // Add version
          const version = document.createElement('div');
          version.classList.add('sidebar-version');
          version.textContent = metadata.version;
          target.appendChild(version);

          // Add repo buttons
          const buttons = document.createElement('div');
          buttons.classList.add('sidebar-buttons');
          buttons.innerHTML = `
            <a class="repo-button repo-button--small repo-button--sponsor" href="https://github.com/sponsors/claviska" rel="noopener" target="_blank">
              <sl-icon name="heart"></sl-icon> Sponsor
            </a>
            <a class="repo-button repo-button--small repo-button--github" href="https://github.com/shoelace-style/shoelace/stargazers" rel="noopener" target="_blank">
              <sl-icon src="/assets/images/github.svg"></sl-icon> <span class="github-star-count">Star</span>
            </a>
            <a class="repo-button repo-button--small repo-button--twitter" href="https://twitter.com/shoelace_style" rel="noopener" target="_blank">
              <sl-icon src="/assets/images/twitter.svg"></sl-icon> Follow
            </a>
          `;
          target.appendChild(buttons);
        })
        .then(() => {
          fetch('https://api.github.com/repos/shoelace-style/shoelace')
            .then(res => res.json())
            .then(json => {
              const count = getShortNumber(json.stargazers_count);
              [...document.querySelectorAll('.github-star-count')].map(stars => stars.textContent = count);
            });
        });
    });

    hook.beforeEach(async function (content, next) {
      const metadata = await getMetadata();

      // Replace %VERSION% placeholders
      content = content.replace(/%VERSION%/g, metadata.version);

      // Handle [component-header] tags
      content = content.replace(/\[component-header:([a-z-]+)\]/g, (match, tag) => {
        const data = metadata.components.filter(data => data.tag === tag)[0];
        let result = '';

        if (!data) {
          console.error('Component not found in metadata: ' + tag);
          next(content);
        }

        const tags = getDocsTagsObject(data.docsTags);
        if (!tags) {
          throw new Error(`No metadata tags found for ${tag}`);
        }

        let badgeType = 'info';
        if (tags.status === 'stable') badgeType = 'primary';
        if (tags.status === 'experimental') badgeType = 'warning';
        if (tags.status === 'planned') badgeType = 'info';
        if (tags.status === 'deprecated') badgeType = 'danger';

        result += `
          <div class="component-header">
            <div class="component-header__tag">
              <code>&lt;${tag}&gt;</code>
            </div>

            <div class="component-header__info">
              <sl-badge type="info" pill>
                Since ${tags.since || '?'}
              </sl-badge>

              <sl-badge type="${badgeType}" pill style="text-transform: capitalize;">
                ${tags.status}
              </sl-badge>
            </div>
          </div>
        `;

        return result.replace(/^ +| +$/gm, '');
      });

      // Handle [component-metadata] tags
      content = content.replace(/\[component-metadata:([a-z-]+)\]/g, (match, tag) => {
        const data = metadata.components.filter(data => data.tag === tag)[0];
        let result = '';

        if (!data) {
          console.error('Component not found in metadata: ' + tag);
          next(content);
        }

        if (data.props.length) {
          result += `
            ## Properties
            ${createPropsTable(data.props)}
          `;
        }

        if (data.events.length) {
          result += `
            ## Events
            ${createEventsTable(data.events)}
          `;
        }

        if (data.methods.length) {
          result += `
            ## Methods
            ${createMethodsTable(data.methods)}
          `;
        }

        if (data.slots.length) {
          result += `
            ## Slots
            ${createSlotsTable(data.slots)}
          `;
        }

        if (data.styles.length) {
          result += `
            ## CSS Custom Properties
            ${createCustomPropertiesTable(data.styles)}
          `;
        }

        if (data.parts.length) {
          result += `
            ## CSS Parts
            ${createPartsTable(data.parts)}
          `;
        }

        if (data.dependents.length) {
          result += `
            ## Dependents

            The following components make use of this component.

            ${createDependentsList(data.dependents)}
          `;
        }

        // Strip whitespace so markdown doesn't process things as code blocks
        return result.replace(/^ +| +$/gm, '');
      });

      next(content);
    });
  });
})();
