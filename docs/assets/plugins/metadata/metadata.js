(() => {
  let metadataStore;

  function createPropsTable(props) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Property</th>
          <th>Attribute</th>
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
          <td><code>${escapeHtml(prop.name)}</code></td>
          <td><code>${escapeHtml(prop.attr)}</code></td>
          <td>${escapeHtml(prop.docs)}</td>
          <td><code>${escapeHtml(prop.type)}</code></td>
          <td><code>${escapeHtml(prop.default)}</code></td>
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
          <td><code>CustomEvent&lt;${escapeHtml(event.detail)}&gt;</code></td>
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
          <th>Returns</th>
        </tr>
      </thead>
      <tbody>
        ${methods
          .map(
            method => `
        <tr>
          <td><code>${escapeHtml(method.name)}</code></td>
          <td>${escapeHtml(method.docs)}</td>
          <td><code>${escapeHtml(method.returns.type)}</code></td>
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

  function createDependenciesList(dependencies) {
    const ul = document.createElement('ul');
    ul.innerHTML = `
        ${dependencies
          .map(
            dependency => `
              <li><code>${escapeHtml(dependency)}</code></li>
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
      .replace(/'/g, '&apos;');
  }

  function getMetadata() {
    return new Promise((resolve, reject) => {
      // Simple caching to prevent multiple XHR requests
      if (metadataStore) {
        return resolve(metadataStore);
      }

      Promise.all([
        fetch('/assets/dist/components.json').then(res => res.json()),
        fetch('/assets/data/custom.json').then(res => res.json())
      ])
        .then(res => ({
          component: res[0],
          custom: res[1]
        }))
        .then(data => {
          metadataStore = data;
          resolve(metadataStore);
        })
        .catch(err => console.error(err));
    });
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
    hook.beforeEach(async function (content, next) {
      const metadata = await getMetadata();

      // Handle [component-header] tags
      content = content.replace(/\[component-header:([a-z-]+)\]/g, (match, tag) => {
        const data = metadata.component.components.filter(data => data.tag === tag)[0];
        let result = '';

        if (!data) {
          console.error('Component not found in metadata: ' + tag);
          next(content);
        }

        const tags = getDocsTagsObject(data.docsTags);

        if (tags && tags.status) {
          result += `
            <div class="component-header">
              <div class="component-header__tag">
                <code>&lt;${tag}&gt;</code>
              </div>

              <div class="component-header__info">
                <small class="badge badge--since">
                  Since ${tags.since || '?'}
                </small>

                <small class="component-header__status badge badge--${tags.status.replace(/\s/g, '-')}">
                  ${tags.status}
                </small>
              </div>
            </div>
          `;
        }

        return result.replace(/^ +| +$/gm, '');
      });

      // Handle [component-metadata] tags
      content = content.replace(/\[component-metadata:([a-z-]+)\]/g, (match, tag) => {
        const data = metadata.component.components.filter(data => data.tag === tag)[0];
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

        if (data.dependencies.length) {
          result += `
            ## Dependencies
            ${createDependenciesList(data.dependencies)}
          `;
        }

        // Strip whitespace so markdown doesn't process things as code blocks
        return result.replace(/^ +| +$/gm, '');
      });

      next(content);
    });

    hook.doneEach(async function (html, next) {
      const metadata = await getMetadata();
      const version = metadata.custom.version;

      // Replace <docs-version> with version number
      [...document.body.querySelectorAll('docs-version')].map(el => el.replaceWith(version));

      next(html);
    });
  });
})();
