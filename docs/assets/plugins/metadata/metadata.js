(() => {
  const isDev = location.hostname === 'localhost';
  const isNext = location.hostname === 'next.shoelace.style';
  const customElements = fetch('/dist/custom-elements.json')
    .then(res => res.json())
    .catch(err => console.error(err));

  function createPropsTable(props) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Reflects</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        ${props
          .map(prop => {
            const hasAttribute = !!prop.attribute;
            const isAttributeDifferent = prop.attribute !== prop.name;
            let attributeInfo = '';

            if (!hasAttribute) {
              attributeInfo = `<br><small>(property only)</small>`;
            } else if (isAttributeDifferent) {
              attributeInfo = `
                <br>
                <sl-tooltip content="This attribute is different from its property">
                  <small>
                    <code class="nowrap">
                      ${escapeHtml(prop.attribute)}
                    </code>
                  </small>
                </sl-tooltip>`;
            }

            return `
              <tr>
                <td>
                  <code class="nowrap">${escapeHtml(prop.name)}</code>
                  ${attributeInfo}
                </td>
                <td>
                  ${escapeHtml(prop.description)}
                </td>
                <td style="text-align: center;">${
                  prop.reflects ? '<sl-icon label="yes" name="check"></sl-icon>' : ''
                }</td>
                <td>${prop.type?.text ? `<code>${escapeHtml(prop.type?.text || '')}</code>` : '-'}</td>
                <td>${prop.default ? `<code>${escapeHtml(prop.default)}</code>` : '-'}</td>
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
          <th data-flavor="html">Name</th>
          <th data-flavor="react">React Event</th>
          <th>Description</th>
          <th>Event Detail</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            event => `
              <tr>
                <td data-flavor="html"><code class="nowrap">${escapeHtml(event.name)}</code></td>
                <td data-flavor="react"><code class="nowrap">${escapeHtml(event.reactName)}</code></td>
                <td>${escapeHtml(event.description)}</td>
                <td>${event.type?.text ? `<code>${escapeHtml(event.type?.text)}` : '-'}</td>
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
          <th>Name</th>
          <th>Description</th>
          <th>Arguments</th>
        </tr>
      </thead>
      <tbody>
        ${methods
          .map(
            method => `
              <tr>
                <td class="nowrap"><code>${escapeHtml(method.name)}</code></td>
                <td>${escapeHtml(method.description)}</td>
                <td>
                  ${
                    method.parameters?.length
                      ? `
                        <code>${escapeHtml(
                          method.parameters.map(param => `${param.name}: ${param.type.text}`).join(', ')
                        )}</code>
                      `
                      : '-'
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
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${slots
          .map(
            slot => `
              <tr>
                <td class="nowrap">${slot.name ? `<code>${escapeHtml(slot.name)}</code>` : '(default)'}</td>
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
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        ${styles
          .map(
            style => `
              <tr>
                <td class="nowrap"><code>${escapeHtml(style.name)}</code></td>
                <td>${escapeHtml(style.description)}</td>
                <td><code>${escapeHtml(style.default)}</code></td>
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
                <td class="nowrap"><code>${escapeHtml(part.name)}</code></td>
                <td>${escapeHtml(part.description)}</td>
              </tr>
           `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createAnimationsTable(animations) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${animations
          .map(
            animation => `
              <tr>
                <td class="nowrap"><code>${escapeHtml(animation.name)}</code></td>
                <td>${escapeHtml(animation.description)}</td>
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

    // Recursively fetch sub-dependencies
    function getDependencies(tag) {
      const component = allComponents.find(c => c.tagName === tag);
      if (!component || !Array.isArray(component.dependencies)) {
        return [];
      }

      component.dependencies?.map(tag => {
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

  function getAllComponents(metadata) {
    const allComponents = [];
    metadata.modules?.map(module => {
      module.declarations?.map(declaration => {
        if (declaration.customElement) {
          // Generate the dist path based on the src path and attach it to the component
          declaration.path = module.path.replace(/^src\//, 'dist/').replace(/\.ts$/, '.js');

          allComponents.push(declaration);
        }
      });
    });

    return allComponents;
  }

  function getComponent(metadata, tagName) {
    return getAllComponents(metadata).find(component => component.tagName === tagName);
  }

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(async function () {
      const metadata = await customElements;
      const target = document.querySelector('.app-name');

      // Add version
      const version = document.createElement('div');
      version.classList.add('sidebar-version');
      version.textContent = isDev ? 'Development' : isNext ? 'Next' : metadata.package.version;
      target.appendChild(version);

      // Store version for reuse
      sessionStorage.setItem('sl-version', metadata.package.version);

      // Add repo buttons
      const buttons = document.createElement('div');
      buttons.classList.add('sidebar-buttons');
      buttons.innerHTML = `
        <sl-button size="small" class="repo-button repo-button--sponsor" href="https://github.com/sponsors/claviska" target="_blank">
          <sl-icon slot="prefix" name="heart"></sl-icon> Sponsor
        </sl-button>
        <sl-button size="small" class="repo-button repo-button--github" href="https://github.com/shoelace-style/shoelace/stargazers" target="_blank">
          <sl-icon slot="prefix" name="github"></sl-icon> <span class="github-star-count">Star</span>
        </sl-button>
        <sl-button size="small" class="repo-button repo-button--twitter" href="https://twitter.com/shoelace_style" target="_blank">
          <sl-icon slot="prefix" name="twitter"></sl-icon> Follow
        </sl-button>
      `;
      target.appendChild(buttons);
    });

    hook.beforeEach(async function (content, next) {
      const metadata = await customElements;

      // Replace %VERSION% placeholders
      content = content.replace(/%VERSION%/g, metadata.package.version);

      // Handle [component-header] tags
      content = content.replace(/\[component-header:([a-z-]+)\]/g, (match, tag) => {
        const component = getComponent(metadata, tag);
        let result = '';

        if (!component) {
          console.error('Component not found in metadata: ' + tag);
          return next(content);
        }

        let badgeType = 'neutral';
        if (component.status === 'stable') badgeType = 'primary';
        if (component.status === 'experimental') badgeType = 'warning';
        if (component.status === 'planned') badgeType = 'neutral';
        if (component.status === 'deprecated') badgeType = 'danger';

        result += `
          <div class="component-header">
            <div class="component-header__tag">
              <code>&lt;${component.tagName}&gt; | ${component.name}</code>
            </div>

            <div class="component-header__info">
              <sl-badge variant="neutral" pill>
                Since ${component.since || '?'}
              </sl-badge>

              <sl-badge variant="${badgeType}" pill style="text-transform: capitalize;">
                ${component.status}
              </sl-badge>
            </div>
          </div>
        `;

        return result.replace(/^ +| +$/gm, '');
      });

      // Handle [component-metadata] tags
      content = content.replace(/\[component-metadata:([a-z-]+)\]/g, (match, tag) => {
        const component = getComponent(metadata, tag);
        let result = '';

        if (!component) {
          console.error('Component not found in metadata: ' + tag);
          return next(content);
        }

        // Remove members that are private or don't have a description
        const members = component.members?.filter(member => member.description && member.privacy !== 'private');
        const methods = members?.filter(prop => prop.kind === 'method' && prop.privacy !== 'private');
        const props = members?.filter(prop => {
          // Look for a corresponding attribute
          const attribute = component.attributes?.find(attr => attr.fieldName === prop.name);
          if (attribute) {
            prop.attribute = attribute.name || attribute.fieldName;
          }

          return prop.kind === 'field' && prop.privacy !== 'private';
        });

        if (component.path) {
          /* prettier-ignore */
          result += `
            ## Importing

            <sl-tab-group>
            <sl-tab slot="nav" panel="script">Script</sl-tab>
            <sl-tab slot="nav" panel="import">Import</sl-tab>
            <sl-tab slot="nav" panel="bundler">Bundler</sl-tab>
            <sl-tab slot="nav" panel="react">React</sl-tab>

            <sl-tab-panel name="script">\n
            To import this component from [the CDN](https://www.jsdelivr.com/package/npm/@shoelace-style/shoelace) using a script tag:

            \`\`\`html
            <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${metadata.package.version}/${component.path}"></script>
            \`\`\`
            </sl-tab-panel>

            <sl-tab-panel name="import">\n
            To import this component from [the CDN](https://www.jsdelivr.com/package/npm/@shoelace-style/shoelace) using a JavaScript import:

            \`\`\`js
            import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${metadata.package.version}/${component.path}';
            \`\`\`
            </sl-tab-panel>

            <sl-tab-panel name="bundler">\n
            To import this component using [a bundler](/getting-started/installation#bundling):
            \`\`\`js
            import '@shoelace-style/shoelace/${component.path}';
            \`\`\`
            </sl-tab-panel>

            <sl-tab-panel name="react">\n
            To import this component as a [React component](/frameworks/react):
            \`\`\`js
            import { ${component.name} } from '@shoelace-style/shoelace/dist/react';
            \`\`\`
            </sl-tab-panel>
            </sl-tab-group>
          `;
        }

        if (props?.length) {
          result += `
            ## Properties
            ${createPropsTable(props)}
          `;
        }

        if (component.events?.length) {
          result += `
            ## Events
            ${createEventsTable(component.events)}
          `;
        }

        if (methods?.length) {
          result += `
            ## Methods

            <p data-flavor="html">
              Methods can be called by obtaining a reference to the element and calling
              <code>el.methodName()</code>.
            </p>


            <p data-flavor="react">
              Methods can be called by obtaining a <code>ref</code> to the element and calling
              <code>ref.current.methodName()</code>.
            </p>

            ${createMethodsTable(methods)}
          `;
        }

        if (component.slots?.length) {
          result += `
            ## Slots
            ${createSlotsTable(component.slots)}
          `;
        }

        if (component.cssProperties?.length) {
          result += `
            ## CSS Custom Properties
            ${createCustomPropertiesTable(component.cssProperties)}
          `;
        }

        if (component.cssParts?.length) {
          result += `
            ## CSS Parts
            ${createPartsTable(component.cssParts)}
          `;
        }

        if (component.animations?.length) {
          result += `
            ## Animations
            ${createAnimationsTable(component.animations)}

            Learn how to [customize animations](/getting-started/customizing#animations).
          `;
        }

        if (component.dependencies?.length) {
          result += `
            ## Dependencies

            This component imports the following dependencies.

            ${createDependenciesList(component.tagName, getAllComponents(metadata))}
          `;
        }

        // Strip whitespace so markdown doesn't process things as code blocks
        return result.replace(/^ +| +$/gm, '');
      });

      next(content);
    });

    // Wrap tables so we can scroll them horizontally when needed
    hook.doneEach(function () {
      const content = document.querySelector('.content');
      const tables = [...content.querySelectorAll('table')];

      tables.map(table => {
        table.outerHTML = `
          <div class="table-wrapper">
            ${table.outerHTML}
          </div>
        `;
      });
    });
  });
})();
