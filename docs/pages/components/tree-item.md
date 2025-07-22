---
meta:
  title: Tree Item
  description: A tree item serves as a hierarchical node that lives inside a tree.
layout: component
---

```html:preview
<sl-tree>
  <sl-tree-item>
    Item 1
    <sl-tree-item>Item A</sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@shoelace-style/shoelace/dist/react/tree';
import SlTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <SlTree>
    <SlTreeItem>
      Item 1
      <SlTreeItem>Item A</SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

## Examples

### Nested tree items

A tree item can contain other tree items. This allows the node to be expanded or collapsed by the user.

```html:preview
<sl-tree>
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
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@shoelace-style/shoelace/dist/react/tree';
import SlTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <SlTree>
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
);
```

### Selected

Use the `selected` attribute to select a tree item initially.

```html:preview
<sl-tree>
  <sl-tree-item selected>
    Item 1
    <sl-tree-item>Item A</sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@shoelace-style/shoelace/dist/react/tree';
import SlTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <SlTree>
    <SlTreeItem selected>
      Item 1
      <SlTreeItem>Item A</SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

### Expanded

Use the `expanded` attribute to expand a tree item initially.

```html:preview
<sl-tree>
  <sl-tree-item expanded>
    Item 1
    <sl-tree-item expanded>
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
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@shoelace-style/shoelace/dist/react/tree';
import SlTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <SlTree>
    <SlTreeItem expanded>
      Item 1
      <SlTreeItem expanded>
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
);
```

### Lazy Loading

Use the `lazy` attribute on a tree item to indicate that the content is not yet present and will be loaded later. When the user tries to expand the node, the `loading` state is set to `true` and the `sl-lazy-load` event will be emitted to allow you to load data asynchronously. The item will remain in a loading state until its content is changed.

If you want to disable this behavior after the first load, simply remove the `lazy` attribute and, on the next expand, the existing content will be shown instead.

```html:preview
<sl-tree>
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

```jsx:react
import SlTree from '@shoelace-style/shoelace/dist/react/tree';
import SlTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

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
    <SlTree>
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
