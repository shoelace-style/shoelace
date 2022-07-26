# Tree

[component-header:sl-tree]

Trees allow you to display a hierarchical list of selectable [tree items](/components/tree-item). Items with children can be expanded and collapsed as desired by the user.

```html preview
<sl-tree>
  <sl-tree-item>
    Deciduous
    <sl-tree-item>Birch</sl-tree-item>
    <sl-tree-item>
      Maple
      <sl-tree-item>Field maple</sl-tree-item>
      <sl-tree-item>Red maple</sl-tree-item>
      <sl-tree-item>Sugar maple</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>Oak</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Coniferous
    <sl-tree-item>Cedar</sl-tree-item>
    <sl-tree-item>Pine</sl-tree-item>
    <sl-tree-item>Spruce</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Non-trees
    <sl-tree-item>Bamboo</sl-tree-item>
    <sl-tree-item>Cactus</sl-tree-item>
    <sl-tree-item>Fern</sl-tree-item>
  </sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem>
      Deciduous
      <SlTreeItem>Birch</SlTreeItem>
      <SlTreeItem>
        Maple
        <SlTreeItem>Field maple</SlTreeItem>
        <SlTreeItem>Red maple</SlTreeItem>
        <SlTreeItem>Sugar maple</SlTreeItem>
      </SlTreeItem>
      <SlTreeItem>Oak</SlTreeItem>
    </SlTreeItem>

    <SlTreeItem>
      Coniferous
      <SlTreeItem>Cedar</SlTreeItem>
      <SlTreeItem>Pine</SlTreeItem>
      <SlTreeItem>Spruce</SlTreeItem>
    </SlTreeItem>

    <SlTreeItem>
      Non-trees
      <SlTreeItem>Bamboo</SlTreeItem>
      <SlTreeItem>Cactus</SlTreeItem>
      <SlTreeItem>Fern</SlTreeItem>
    </SlTreeItem>
  </SlTree>
);
```

## Examples

### Selection Modes

Use the `selection` attribute to change the selection behavior of the tree.

- Set `single` to allow the selection of a single item (default).
- Set `multiple` to allow the selection of multiple items.
- Set `leaf` to allow the selection of a single leaf node. Clicking on a parent node will expand/collapse the node.

```html preview
<sl-select id="selection-mode" value="single" label="Selection">
  <sl-menu-item value="single">Single</sl-menu-item>
  <sl-menu-item value="multiple">Multiple</sl-menu-item>
  <sl-menu-item value="leaf">Leaf</sl-menu-item>
</sl-select>

<br />

<sl-tree class="tree-selectable">
  <sl-tree-item>
    Item 1
    <sl-tree-item>
      Item A
      <sl-tree-item>Item Z</sl-tree-item>
      <sl-tree-item>Item Y</sl-tree-item>
      <sl-tree-item>Item X</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>

<script>
  const selectionMode = document.querySelector('#selection-mode');
  const tree = document.querySelector('.tree-selectable');

  selectionMode.addEventListener('sl-change', () => {
    tree.querySelectorAll('sl-tree-item').forEach(item => (item.selected = false));
    tree.selection = selectionMode.value;
  });
</script>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [selection, setSelection] = useState('single');

  return (
    <>
      <SlSelect label="Selection" value={value} onSlChange={event => setSelection(event.target.value)}>
        <SlMenuItem value="single">single</SlMenuItem>
        <SlMenuItem value="multiple">multiple</SlMenuItem>
        <SlMenuItem value="leaf">leaf</SlMenuItem>
      </SlSelect>

      <br />

      <SlTree class="tree-selectable">
        <SlTreeItem>
          Item 1
          <SlTreeItem>
            Item A
            <SlTreeItem>Item Z</SlTreeItem>
            <SlTreeItem>Item Y</SlTreeItem>
            <SlTreeItem>Item X</SlTreeItem>
          </SlTreeItem>
          <SlTreeItem>Item B</SlTreeItem>
          <SlTreeItem>Item C</SlTreeItem>
        </SlTreeItem>
        <SlTreeItem>Item 2</SlTreeItem>
        <SlTreeItem>Item 3</SlTreeItem>
      </SlTree>
    </>
  );
};
```

### Showing Indent Guides

Indent guides can be drawn by setting `--indent-guide-width`. You can also change the color, offset, and style, using `--indent-guide-color`, `--indent-guide-style`, and `--indent-guide-offset`, respectively.

```html preview
<sl-tree class="tree-with-lines">
  <sl-tree-item expanded>
    Deciduous
    <sl-tree-item>Birch</sl-tree-item>
    <sl-tree-item expanded>
      Maple
      <sl-tree-item>Field maple</sl-tree-item>
      <sl-tree-item>Red maple</sl-tree-item>
      <sl-tree-item>Sugar maple</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>Oak</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Coniferous
    <sl-tree-item>Cedar</sl-tree-item>
    <sl-tree-item>Pine</sl-tree-item>
    <sl-tree-item>Spruce</sl-tree-item>
  </sl-tree-item>

  <sl-tree-item>
    Non-trees
    <sl-tree-item>Bamboo</sl-tree-item>
    <sl-tree-item>Cactus</sl-tree-item>
    <sl-tree-item>Fern</sl-tree-item>
  </sl-tree-item>
</sl-tree>

<style>
  .tree-with-lines {
    --indent-guide-width: 1px;
  }
</style>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree class="tree-with-lines" style={{ '--indent-guide-width': '1px' }}>
    <SlTreeItem expanded>
      Deciduous
      <SlTreeItem>Birch</SlTreeItem>
      <SlTreeItem expanded>
        Maple
        <SlTreeItem>Field maple</SlTreeItem>
        <SlTreeItem>Red maple</SlTreeItem>
        <SlTreeItem>Sugar maple</SlTreeItem>
      </SlTreeItem>
      <SlTreeItem>Oak</SlTreeItem>
    </SlTreeItem>

    <SlTreeItem>
      Coniferous
      <SlTreeItem>Cedar</SlTreeItem>
      <SlTreeItem>Pine</SlTreeItem>
      <SlTreeItem>Spruce</SlTreeItem>
    </SlTreeItem>

    <SlTreeItem>
      Non-trees
      <SlTreeItem>Bamboo</SlTreeItem>
      <SlTreeItem>Cactus</SlTreeItem>
      <SlTreeItem>Fern</SlTreeItem>
    </SlTreeItem>
  </SlTree>
);
```

### Lazy Loading

Use the `lazy` attribute on a tree item to indicate that the content is not yet present and will be loaded later. When the user tries to expand the node, the `loading` state is set to `true` and the `sl-lazy-load` event will be emitted to allow you to load data asynchronously. The item will remain in a loading state until its content is changed.

If you want to disable this behavior after the first load, simply remove the `lazy` attribute and, on the next expand, the existing content will be shown instead.

```html preview
<sl-tree selection="leaf">
  <sl-tree-item lazy>Available Trees</sl-tree-item>
</sl-tree>

<script type="module">
  const lazyItem = document.querySelector('sl-tree-item[lazy]');

  lazyItem.addEventListener('sl-lazy-load', () => {
    // Simulate asynchronous loading
    setTimeout(() => {
      const subItems = ['Birch', 'Cedar', 'Maple', 'Pine'];

      for (const item of subItems) {
        const treeItem = document.createElement('sl-tree-item');
        treeItem.innerText = item;
        lazyItem.append(treeItem);
      }

      // Disable lazy mode once the content has been loaded
      lazyItem.lazy = false;
    }, 1000);
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
      setChildItems(['Birch', 'Cedar', 'Maple', 'Pine']);

      // Disable lazy mode once the content has been loaded
      setLazy(false);
    }, 1000);
  };

  return (
    <SlTree selection="leaf">
      <SlTreeItem lazy={lazy} onSlLazyLoad={handleLazyLoad}>
        Available Trees
        {childItems.map(item => (
          <SlTreeItem>{item}</SlTreeItem>
        ))}
      </SlTreeItem>
    </SlTree>
  );
};
```

### With Icons

Decorative icons can be used before labels to provide hints for each node.

```html preview
<sl-tree class="tree-with-icons">
  <sl-tree-item expanded>
    <sl-icon name="folder"></sl-icon>
    Root

    <sl-tree-item>
      <sl-icon name="folder"> </sl-icon>
      Folder 1
      <sl-tree-item>
        <sl-icon name="files"></sl-icon>
        File 1 - 1
      </sl-tree-item>
      <sl-tree-item disabled>
        <sl-icon name="files"></sl-icon>
        File 1 - 2
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="files"></sl-icon>
        File 1 - 3
      </sl-tree-item>
    </sl-tree-item>

    <sl-tree-item>
      <sl-icon name="files"></sl-icon>
      Folder 2
      <sl-tree-item>
        <sl-icon name="files"></sl-icon>
        File 2 - 1
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="files"></sl-icon>
        File 2 - 2
      </sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>
      <sl-icon name="files"></sl-icon>
      File 1
    </sl-tree-item>
  </sl-tree-item>
</sl-tree>
```

```jsx react
import { SlIcon, SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [childItems, setChildItems] = useState([]);
  const [lazy, setLazy] = useState(true);

  const handleLazyLoad = () => {
    // Simulate asynchronous loading
    setTimeout(() => {
      setChildItems(['Overview', 'Installation', 'Usage']);

      // Disable lazy mode once the content has been loaded
      setLazy(false);
    }, 1000);
  };

  return (
    <SlTree class="tree-with-icons">
      <SlTreeItem expanded>
        <SlIcon name="folder" />
        Root
        <SlTreeItem>
          <SlIcon name="folder" />
          Folder 1<SlTreeItem>
            <SlIcon name="files" />
            File 1 - 1
          </SlTreeItem>
          <SlTreeItem disabled>
            <SlIcon name="files" />
            File 1 - 2
          </SlTreeItem>
          <SlTreeItem>
            <SlIcon name="files" />
            File 1 - 3
          </SlTreeItem>
        </SlTreeItem>
        <SlTreeItem>
          <SlIcon name="files" />
          Folder 2<SlTreeItem>
            <SlIcon name="files" />
            File 2 - 1
          </SlTreeItem>
          <SlTreeItem>
            <SlIcon name="files" />
            File 2 - 2
          </SlTreeItem>
        </SlTreeItem>
        <SlTreeItem>
          <SlIcon name="files" />
          File 1
        </SlTreeItem>
      </SlTreeItem>
    </SlTree>
  );
};
```

[component-metadata:sl-tree]
