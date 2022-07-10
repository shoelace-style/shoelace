# Tree

[component-header:sl-tree]

A tree component allow the user to display a hierarchical list of items, expanding and collapsing the nodes that have nested items.
The user can select one or more items from the list.

```html preview
<sl-tree>
  <sl-tree-item expanded>
    Getting Started
    <sl-tree-item>
      Overview
      <sl-tree-item>Quick Start</sl-tree-item>
      <sl-tree-item>New to Web Components?</sl-tree-item>
      <sl-tree-item>What Problem Does This Solve?</sl-tree-item>
      <sl-tree-item>Browser Support</sl-tree-item>
      <sl-tree-item>License</sl-tree-item>
      <sl-tree-item>Attribution</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item> Installation </sl-tree-item>
    <sl-tree-item> Usage </sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Frameworks
    <sl-tree-item> React</sl-tree-item>
    <sl-tree-item> Vue</sl-tree-item>
    <sl-tree-item> Angular</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item disabled> Resources </sl-tree-item>
</sl-tree>
```

```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem expanded>
      Getting Started
      <SlTreeItem> Overview </SlTreeItem>
      <SlTreeItem> Installation </SlTreeItem>
      <SlTreeItem> Usage </SlTreeItem>
    </SlTreeItem>

    <SlTreeItem>
      Frameworks
      <SlTreeItem> React</SlTreeItem>
      <SlTreeItem> Vue</SlTreeItem>
      <SlTreeItem> Angular</SlTreeItem>
    </SlTreeItem>

    <SlTreeItem disabled> Resources </SlTreeItem>
  </SlTree>
);
```

## Examples

### Selection modes

Use the `selection` attribute to specify the selection behavior of the tree

- Set `none` (_default_) to disable the selection.
- Set `single` to allow the selection of a single item.
- Set `leaf` to allow the selection of a single leaf node. Clicking on a parent node will expand/collapse the node.
- Set `multiple` to allow the selection of multiple items.

```html preview
<sl-select id="selection-mode" value="none" label="Selection">
  <sl-menu-item value="none">none</sl-menu-item>
  <sl-menu-item value="single">single</sl-menu-item>
  <sl-menu-item value="leaf">leaf</sl-menu-item>
  <sl-menu-item value="multiple">multiple</sl-menu-item>
</sl-select>
<br />
<sl-tree class="selectable">
  <sl-tree-item expanded>
    Parent
    <sl-tree-item expanded>
      Parent 1
      <sl-tree-item> Child 1 </sl-tree-item>
      <sl-tree-item> Child 2 </sl-tree-item>
    </sl-tree-item>

    <sl-tree-item>
      Parent 2
      <sl-tree-item> Child 1</sl-tree-item>
      <sl-tree-item> Child 2</sl-tree-item>
      <sl-tree-item> Child 3</sl-tree-item>
    </sl-tree-item>
  </sl-tree-item>
</sl-tree>
<style>
  .selectable sl-tree-item::part(item--selected) {
    color: var(--sl-color-primary-600);
  }
</style>
<script>
  (() => {
    const selectionMode = document.querySelector('#selection-mode');
    const treeItem = document.querySelector('.selectable');
    selectionMode.addEventListener('sl-change', () => {
      treeItem.selection = selectionMode.value;
    });
  })();
</script>
```

```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [selection, setSelection] = useState('none');

  return (
    <>
      <SlSelect label="Selection" value={value} onSlChange={event => setSelection(event.target.value)}>
        <SlMenuItem value="none">none</SlMenuItem>
        <SlMenuItem value="single">single</SlMenuItem>
        <SlMenuItem value="leaf">leaf</SlMenuItem>
        <SlMenuItem value="multiple">multiple</SlMenuItem>
      </SlSelect>
      <br />
      <SlTree selection={selection} class="selectable">
        <SlTreeItem expanded>
          Parent
          <SlTreeItem expanded>
            Parent 1<SlTreeItem> Child 1 </SlTreeItem>
            <SlTreeItem> Child 2 </SlTreeItem>
          </SlTreeItem>
          <SlTreeItem>
            Parent 2<SlTreeItem> Child 1</SlTreeItem>
            <SlTreeItem> Child 2</SlTreeItem>
            <SlTreeItem> Child 3</SlTreeItem>
          </SlTreeItem>
        </SlTreeItem>
      </SlTree>
    </>
  );
};
```

### Lazy loading

Use the `lazy` attribute on a item to indicate that the content is not yet present and will be loaded later.
When the user tries to expand the node, the `loading` state is set to `true` and a special event named
`sl-lazy-load` is emitted to let the loading of the content. The item will remain in a loading state until its content
is changed.

If you want to disable this behavior, for example after the content has been loaded, it will be sufficient to set
`lazy` to `false`.

```html preview
<sl-tree>
  <sl-tree-item lazy> Getting Started </sl-tree-item>
</sl-tree>

<script type="module">
  const lazyItem = document.querySelector('sl-tree-item[lazy]');
  lazyItem.addEventListener('sl-lazy-load', () => {
    // Simulate an asynchronous loading
    setTimeout(() => {
      const subItems = ['Overview', 'Installation', 'Usage'];

      const fragment = document.createDocumentFragment();
      for (const item of subItems) {
        const treeItem = document.createElement('sl-tree-item');
        treeItem.innerText = item;

        fragment.appendChild(treeItem);
      }
      lazyItem.appendChild(fragment);

      // Disable lazy mode since the content has been loaded
      lazyItem.lazy = false;
    }, 2000);
  });
</script>
```

```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [childItems, setChildItems] = useState([]);
  const [lazy, setLazy] = useState(true);

  const handleLazyLoad = () => {
    // Simulate asynchronous loading
    setTimeout(() => {
      setChildItems(['Overview', 'Installation', 'Usage']);

      // Disable lazy mode since the content has been loaded
      setLazy(false);
    }, 2000);
  };

  return (
    <SlTree>
      <SlTreeItem lazy={lazy} onSlLazyLoad={handleLazyLoad}>
        Getting Started
        {childItems.map(item => (
          <SlTreeItem>{item}</SlTreeItem>
        ))}
      </SlTreeItem>
    </SlTree>
  );
};
```

### Styling trees

Using CSS parts is possible to apply custom styles to the tree.
For example, it is possible to change the hover effect and to highlight the selected item.

```html preview
<style>
  .with-custom-style sl-tree-item::part(item) {
    border-left: 2px solid transparent;
  }

  .with-custom-style sl-tree-item:not([disabled])::part(item):hover,
  .with-custom-style sl-tree-item:focus-visible::part(item) {
    color: var(--sl-color-primary-1000);
    background-color: var(--sl-color-neutral-200);
  }

  .with-custom-style sl-tree-item::part(item--selected),
  .with-custom-style sl-tree-item::part(item--selected):hover,
  .with-custom-style sl-tree-item:focus-visible::part(item--selected) {
    color: var(--sl-color-neutral-1000);
    background-color: var(--sl-color-neutral-100);
    border-left-color: var(--sl-color-primary-600);
  }
</style>
<sl-tree selection="leaf" class="with-custom-style">
  <sl-tree-item expanded>
    Getting Started
    <sl-tree-item>
      Overview
      <sl-tree-item>Quick Start</sl-tree-item>
      <sl-tree-item>New to Web Components?</sl-tree-item>
      <sl-tree-item>What Problem Does This Solve?</sl-tree-item>
      <sl-tree-item>Browser Support</sl-tree-item>
      <sl-tree-item>License</sl-tree-item>
      <sl-tree-item>Attribution</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item selected> Installation </sl-tree-item>
    <sl-tree-item> Usage </sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Frameworks
    <sl-tree-item> React</sl-tree-item>
    <sl-tree-item> Vue</sl-tree-item>
    <sl-tree-item> Angular</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item disabled> Resources </sl-tree-item>
</sl-tree>
```

### With indentation lines

```html preview
<style>
  .with-indentation-lines sl-tree-item[expanded]::part(children) {
    position: relative;
  }

  .with-indentation-lines sl-tree-item[expanded]::part(children)::before {
    content: '';
    position: absolute;
    left: 1em;
    top: var(--sl-spacing-2x-small);
    bottom: var(--sl-spacing-2x-small);
    border-right: 1px solid var(--sl-color-neutral-100);
    transition: 0.2s border-right ease-in-out;
  }

  .with-indentation-lines sl-tree-item[expanded]::part(children):hover::before {
    border-right: 1px solid var(--sl-color-neutral-600);
  }
</style>
<sl-tree class="with-indentation-lines">
  <sl-tree-item expanded>
    Getting Started
    <sl-tree-item>
      Overview
      <sl-tree-item>Quick Start</sl-tree-item>
      <sl-tree-item>New to Web Components?</sl-tree-item>
      <sl-tree-item>What Problem Does This Solve?</sl-tree-item>
      <sl-tree-item>Browser Support</sl-tree-item>
      <sl-tree-item>License</sl-tree-item>
      <sl-tree-item>Attribution</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item> Installation </sl-tree-item>
    <sl-tree-item> Usage </sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Frameworks
    <sl-tree-item> React</sl-tree-item>
    <sl-tree-item> Vue</sl-tree-item>
    <sl-tree-item> Angular</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item disabled> Resources </sl-tree-item>
</sl-tree>
```

### With icons

```html preview
<style>
  sl-icon {
    margin-right: var(--sl-spacing-x-small);
  }
</style>
<sl-tree>
  <sl-tree-item expanded>
    <sl-icon name="folder"></sl-icon>Root
    <sl-tree-item>
      <sl-icon name="folder"> </sl-icon>Folder 1
      <sl-tree-item> <sl-icon name="files"></sl-icon>File 1 - 1 </sl-tree-item>
      <sl-tree-item disabled> <sl-icon name="files"></sl-icon>File 1 - 2 </sl-tree-item>
      <sl-tree-item> <sl-icon name="files"></sl-icon>File 1 - 3 </sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>
      <sl-icon name="files"></sl-icon>
      Folder 2
      <sl-tree-item selected> <sl-icon name="files"></sl-icon>File 2 - 1 </sl-tree-item>
      <sl-tree-item> <sl-icon name="files"></sl-icon>File 2 - 2 </sl-tree-item>
    </sl-tree-item>
    <sl-tree-item> <sl-icon name="files"></sl-icon>File 1 </sl-tree-item>
  </sl-tree-item>
</sl-tree>
```

[component-metadata:sl-tree]
