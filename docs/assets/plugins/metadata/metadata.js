(() => {
  let metadataStore;

  function getAttrName(propName) {
    return propName.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');
  }

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
          .map(prop => {
            const attr = getAttrName(prop.name);
            return `
              <tr>
                <td>
                  <code>${escapeHtml(prop.name)}</code>
                  ${
                    prop.name !== attr
                      ? `
                        <br>
                        <small>
                          <sl-tooltip content="Use this attribute in your HTML">
                            <code class="attribute-tooltip">${escapeHtml(attr)}</code>
                          </sl-tooltip>
                        </small>`
                      : ''
                  }
                </td>
                <td>${escapeHtml(prop.description)}</td>
                <td><code style="white-space: normal;">${escapeHtml(prop.type)}</code></td>
                <td><code style="white-space: normal;">${escapeHtml(prop.defaultValue)}</code></td>
              </tr>
          `;
          })
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
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            event => `
        <tr>
          <td><code>${escapeHtml(event.name)}</code></td>
          <td>${escapeHtml(event.description)}</td>
          <td><code style="white-space: normal;">${escapeHtml(event.details)}</code></td>
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
          <th>Arguments</th>
        </tr>
      </thead>
      <tbody>
        ${methods
          .map(
            method => `
              <tr>
                <td><code>${escapeHtml(method.name)}</code></td>
                <td>${escapeHtml(method.description)}</td>
                <td>
                  ${
                    method.params.length
                      ? `
                        <code style="white-space: normal;">${escapeHtml(
                          method.params.map(param => `${param.name}: ${param.type}`).join(', ')
                        )}</code>
                      `
                      : ''
                  }
                </td>
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
          <td>${escapeHtml(slot.description)}</td>
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
          <td>${escapeHtml(style.description)}</td>
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
          <td>${escapeHtml(part.description)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createDependenciesList(targetComponent, allComponents) {
    const ul = document.createElement('ul');
    const dependencies = [];

    // Recursively fetch subdependencies
    function getDependencies(tag) {
      const component = allComponents.find(c => c.tag === tag);
      if (!component || !Array.isArray(component.dependencies)) {
        return [];
      }

      component.dependencies.map(tag => {
        if (!dependencies.includes(tag)) {
          dependencies.push(tag);
        }
        getDependencies(tag);
      });
    }

    getDependencies(targetComponent);
    dependencies.sort().map(tag => {
      const li = document.createElement('li');
      li.innerHTML = `<code>&lt;${tag}&gt;</code>`;
      ul.appendChild(li);
    });

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

      fetch('/dist/metadata.json')
        .then(res => res.json())
        .then(data => {
          metadataStore = data;
          resolve(metadataStore);
        })
        .catch(err => console.error(err));
    });
  }

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(function () {
      getMetadata().then(metadata => {
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
              <sl-icon name="github"></sl-icon> <span class="github-star-count">Star</span>
            </a>
            <a class="repo-button repo-button--small repo-button--twitter" href="https://twitter.com/shoelace_style" rel="noopener" target="_blank">
              <sl-icon name="twitter"></sl-icon> Follow
            </a>
          `;
        target.appendChild(buttons);
      });
    });

    hook.beforeEach(async function (content, next) {
      const metadata = await getMetadata();

      // Replace %VERSION% placeholders
      content = content.replace(/%VERSION%/g, metadata.version);

      // Handle [component-header] tags
      content = content.replace(/\[component-header:([a-z-]+)\]/g, (match, tag) => {
        const component = metadata.components.filter(data => data.tag === tag)[0];
        let result = '';

        if (!component) {
          console.error('Component not found in metadata: ' + tag);
          next(content);
        }

        let badgeType = 'info';
        if (component.status === 'stable') badgeType = 'primary';
        if (component.status === 'experimental') badgeType = 'warning';
        if (component.status === 'planned') badgeType = 'info';
        if (component.status === 'deprecated') badgeType = 'danger';

        result += `
          <div class="component-header">
            <div class="component-header__tag">
              <code>${component.className} | &lt;${component.tag}&gt;</code>
            </div>

            <div class="component-header__info">
              <sl-badge type="info" pill>
                Since ${component.since || '?'}
              </sl-badge>

              <sl-badge type="${badgeType}" pill style="text-transform: capitalize;">
                ${component.status}
              </sl-badge>
            </div>
          </div>
        `;

        return result.replace(/^ +| +$/gm, '');
      });

      // Handle [component-metadata] tags
      content = content.replace(/\[component-metadata:([a-z-]+)\]/g, (match, tag) => {
        const component = metadata.components.filter(data => data.tag === tag)[0];
        let result = '';

        if (!component) {
          console.error('Component not found in metadata: ' + tag);
          next(content);
        }

        if (component.props.length) {
          result += `
            ## Properties
            ${createPropsTable(component.props)}
          `;
        }

        if (component.events.length) {
          result += `
            ## Events
            ${createEventsTable(component.events)}
          `;
        }

        if (component.methods.length) {
          result += `
            ## Methods
            ${createMethodsTable(component.methods)}
          `;
        }

        if (component.slots.length) {
          result += `
            ## Slots
            ${createSlotsTable(component.slots)}
          `;
        }

        if (component.cssCustomProperties.length) {
          result += `
            ## CSS Custom Properties
            ${createCustomPropertiesTable(component.cssCustomProperties)}
          `;
        }

        if (component.parts.length) {
          result += `
            ## CSS Parts
            ${createPartsTable(component.parts)}
          `;
        }

        if (component.dependencies.length) {
          result += `
            ## Dependencies

            This component has the following dependencies so, if you're [cherry picking](/getting-started/installation#cherry-picking),
            be sure to import these components in addition to <code>&lt;${tag}&gt;</code>.

            ${createDependenciesList(component.tag, metadata.components)}
          `;
        }

        // Strip whitespace so markdown doesn't process things as code blocks
        return result.replace(/^ +| +$/gm, '');
      });

      next(content);
    });
  });
})();
