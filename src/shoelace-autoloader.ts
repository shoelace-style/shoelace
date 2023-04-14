import { getBasePath } from './utilities/base-path';

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discover(node as Element);
      }
    }
  }
});

/**
 * Checks a node for undefined elements and attempts to register them.
 */
export async function discover(root: Element | ShadowRoot) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
  const rootIsCustomElement = rootTagName?.includes('-');
  const tags = [...root.querySelectorAll(':not(:defined)')]
    .map(el => el.tagName.toLowerCase())
    .filter(tag => tag.startsWith('sl-'));

  // If the root element is an undefined custom element, add it to the list
  if (rootIsCustomElement && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }

  // Make the list unique
  const tagsToRegister = [...new Set(tags)];

  await Promise.allSettled(tagsToRegister.map(tagName => register(tagName)));
}

/**
 * Registers an element by tag name.
 */
function register(tagName: string): Promise<void> {
  const tagWithoutPrefix = tagName.replace(/^sl-/i, '');
  const path = getBasePath(`components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`);

  // If the element is already defined, there's nothing more to do
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  // Register it
  return new Promise((resolve, reject) => {
    import(path)
      .then(() => resolve())
      .catch(() => reject(new Error(`Unable to automatically load<${tagName}> from ${path}`)));
  });
}

// Initial discovery
discover(document.body);

// Listen for new undefined elements
observer.observe(document.body, { subtree: true, childList: true });
